import { useCallback, useMemo, useState } from 'react'

import SearchInput from '@components/SearchInput/SearchInput'
import SearchResultsList from '@/components/SearchResultsList/SearchResultsList'
import { useSearchQuery } from '@/services/weatherapi'
import useDebounce from '@/hooks/useDebounce'

import { SearchResponse } from './services/weatherapi/types'

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const skip = debouncedSearchQuery.length < 3

  const { data: searchResults } = useSearchQuery(debouncedSearchQuery, { skip })

  const listItems = useMemo(() => searchResults?.map(item => ({ key: `${item.id}`, text: `${item.name}, ${item.region} | ${item.country}`, ...item })), [searchResults])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const onItemClick = (item: SearchResponse['0']) => console.log(item)

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-pink-800">Welcome to Weather App</h1>
      <div className="mb-2 text-base text-white">Enter a city to see weather details</div>
      <div className="container">
        <div className="grid grid-cols-6 gap-4">
          <div className="relative col-span-2 col-start-3 shadow-2xl shadow-black">
            <SearchInput className="w-full" placeholder="eg Athens" value={searchQuery} onChange={onChange} />
            { (!skip && listItems) && <SearchResultsList<SearchResponse['0'] & { key: string, text: string }> className="absolute bg-slate-100" items={listItems} onItemClick={onItemClick} /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
