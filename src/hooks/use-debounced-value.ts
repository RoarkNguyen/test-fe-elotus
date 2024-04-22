import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(initialValue: T, delay = 500) {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return {
    value,
    setValue,
    debouncedValue,
  }
}