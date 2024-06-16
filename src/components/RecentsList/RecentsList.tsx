import { twMerge } from 'tailwind-merge'

import SearchResultsList from '../SearchResultsList/SearchResultsList'
import { RecentsListProps } from './types'

const RecentsList = <T extends { key: string, text: string }>({ className, onClearClicked, ...props}: RecentsListProps<T>) => {
  return (
    <div className={twMerge('rounded-b-md w-full z-50', className)}>
      <div className='flex justify-between pt-2 pl-3 pr-3 text-sm text-gray-400 bg-inherit'>
        <span>Recent Searches</span>
        <button className='text-blue-500 hover:underline' onClick={onClearClicked}>Clear</button>
      </div>
      <SearchResultsList {...props} />
    </div>
  )
}

export default RecentsList
