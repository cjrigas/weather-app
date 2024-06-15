import { SearchResultsListItemProps } from './types'

const SearchResultsListItem = <T extends { text: string }>({ item, onClick }: SearchResultsListItemProps<T>) => {
  return (
    <li className='flex flex-row items-center h-10 pl-3 pr-3 hover:bg-emerald-100' onClick={onClick}>
      <div className='w-5 h-full mr-2 bg-left bg-no-repeat bg-contain bg-mag-glass-icon' />
      <div className='flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>{ item.text }</div>
    </li>
  )
}

export default SearchResultsListItem
