import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import SearchInput from '@components/SearchInput/SearchInput'
import SearchResultsList from '@/components/SearchResultsList/SearchResultsList'
import RecentsList from '@/components/RecentsList/RecentsList'
import { RootState } from '@/store'
import { clearAllRecent } from '@/store/savedItems'
import useDebounce from '@/hooks/useDebounce'
import { useSearchQuery } from '@/services/weatherapi'

import { ListItem, SearchSectionProps } from './types'

const SearchSection = ({ inputValue, onValueChange, onRecentItemClick, onSearchItemClick, onError, className, ...props }: SearchSectionProps) => {
  const dispatch = useDispatch()
  const recentItems = useSelector((state: RootState) => state.savedItems.recent)
  
  const [isFocused, setIsFocused] = useState(false)
  
  const debouncedSearchQuery = useDebounce(inputValue, 500)
  const { data: searchResults, error: searchError } = useSearchQuery(debouncedSearchQuery, { skip: debouncedSearchQuery.length < 3 })

  React.useEffect(() => {
    if (searchError) onError(searchError)
  }, [searchError])
  
  const listItems = useMemo(() => searchResults?.map(item => ({ key: `${item.id}`, text: `${item.name}, ${item.region} | ${item.country}`, ...item })), [searchResults])
  
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }, [])
  
  const onFocusChanged = useCallback((value: boolean) => setTimeout(() => setIsFocused(value), 100), [])
  
  const onClearClicked = () => {
    dispatch(clearAllRecent())
  }
  
  return (
    <div className={twMerge('relative shadow-2xl shadow-black', className)} {...props}>
      <SearchInput className="w-full" placeholder="eg Athens" value={inputValue} onChange={onChange} onFocusChanged={onFocusChanged} />
      { isFocused && inputValue === '' && recentItems.length > 0 && (
        <RecentsList<ListItem> className="absolute bg-slate-100" items={recentItems} onItemClick={onRecentItemClick} onClearClicked={onClearClicked} />
      ) }
      { isFocused && inputValue.length > 2 && listItems && (
        <SearchResultsList<ListItem> className="absolute bg-slate-100" items={listItems} onItemClick={onSearchItemClick} />
      ) }
    </div>
  )
}

export default SearchSection
