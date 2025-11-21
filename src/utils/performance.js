import { useCallback, useRef } from 'react'

/**
 * 节流Hook
 */
export const useThrottle = (fn, delay = 300) => {
  const timer = useRef(null)
  
  return useCallback((...args) => {
    if (timer.current) return
    
    timer.current = setTimeout(() => {
      fn(...args)
      timer.current = null
    }, delay)
  }, [fn, delay])
}

/**
 * 防抖Hook
 */
export const useDebounce = (fn, delay = 300) => {
  const timer = useRef(null)
  
  return useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    
    timer.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }, [fn, delay])
}
