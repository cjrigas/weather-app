import { twMerge } from 'tailwind-merge'

import SearchResultsListItem from './SearchResultsListItem'
import { SearchResultsListProps } from './types'

const SearchResultsList = <T extends { key: string, text: string }>({ className, items, onItemClick, ...props }: SearchResultsListProps<T>) => {
  return (
    <div className={twMerge('rounded-b-md w-full z-50', className)} {...props}>
      <ul>
        { items.map(item => <SearchResultsListItem key={item.key} item={item} onClick={() => onItemClick(item)} />) }
      </ul>
    </div>
  )
}

export default SearchResultsList
