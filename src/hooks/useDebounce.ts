import { useState, useEffect } from 'react'

/**
 * useDebounce hook
 * 
 * @param {any} value The value to debounce.
 * @param {number} delay The delay in milliseconds to wait before updating the debounced value.
 * @return The debounced value.
 */
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes (also on component unmount), which is the cleanup function of useEffect
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Only re-call effect if value or delay changes

  return debouncedValue
}

export default useDebounce
