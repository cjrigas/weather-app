import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchInput from '@components/SearchInput/SearchInput'
import SearchResultsList from '@/components/SearchResultsList/SearchResultsList'
import RecentsList from '@/components/RecentsList/RecentsList'
import { useLazyCurrentQuery, useSearchQuery } from '@/services/weatherapi'
import { SearchResponse } from '@/services/weatherapi/types'
import useDebounce from '@/hooks/useDebounce'
import { addToRecent, clearAllRecent } from '@/store/savedItems'
import { RootState } from '@/store'

const App = () => {
  const dispatch = useDispatch()

  const recentItems = useSelector((state: RootState) => state.savedItems.recent)

  const [isFocused, setIsFocused] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data: searchResults } = useSearchQuery(debouncedSearchQuery, { skip: debouncedSearchQuery.length < 3 })

  const listItems = useMemo(() => searchResults?.map(item => ({ key: `${item.id}`, text: `${item.name}, ${item.region} | ${item.country}`, ...item })), [searchResults])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setTimeout(() => setIsFocused(false), 100)
  }, [])

  const onItemClick = (item: SearchResponse['0'] & { key: string, text: string }) => {
    setSearchQuery('')
    dispatch(addToRecent(item))
  }

  const onClearClicked = () => {
    dispatch(clearAllRecent())
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-[#4a4942]">Weather App</h1>
      <div className="mb-2 text-base text-white">Enter a city to see weather details</div>
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div className="relative col-span-2 col-start-3 shadow-2xl shadow-black">
            <SearchInput className="w-full" placeholder="eg Athens" value={searchQuery} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            { (isFocused && searchQuery == '' && recentItems.length > 0) && <RecentsList<SearchResponse['0'] & { key: string, text: string }> className="absolute bg-slate-100" items={recentItems} onItemClick={onItemClick} onClearClicked={onClearClicked} /> }
            { (isFocused && searchQuery.length > 2 && listItems) && <SearchResultsList<SearchResponse['0'] & { key: string, text: string }> className="absolute bg-slate-100" items={listItems} onItemClick={onItemClick} /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
