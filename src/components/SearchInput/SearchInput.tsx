import { twMerge } from 'tailwind-merge'

import { SearchInputProps } from './types'

const SearchInput = ({ className, onFocusChanged, ...props }: SearchInputProps) => {
  return (
    <input className={twMerge('outline-none py-4 px-3 text-gray-700', className)} onFocus={() => onFocusChanged(true)} onBlur={() => onFocusChanged(false)} {...props} />
  )
}

export default SearchInput
