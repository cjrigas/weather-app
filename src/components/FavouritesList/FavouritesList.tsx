import { twMerge } from 'tailwind-merge'

import { FavouritesListProps } from './types'

const FavouritesList = <T extends { key: string, text: string }>({ className, items, onItemClick, ...props}: FavouritesListProps<T>) => {
  return (
    <div className={twMerge('flex justify-center p-5', className)} {...props}>
      { items.map(item => <button key={item.key} className='pt-1 pb-1 pl-2 pr-2 ml-1 mr-1 text-sm text-blue-500 bg-white rounded-md opacity-85 hover:opacity-50' onClick={() => onItemClick(item)}>{ item.text }</button>) }
    </div>
  )
}

export default FavouritesList
