import { twMerge } from 'tailwind-merge'

const SearchInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <input className={twMerge('outline-none py-4 px-3 text-gray-700', className)} {...props} />
  )
}

export default SearchInput
