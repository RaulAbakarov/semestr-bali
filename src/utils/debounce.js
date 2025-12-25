// Debounce utility to prevent excessive function calls
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Request animation frame throttle for better performance
export function rafThrottle(callback) {
  let rafId = null
  return function throttled(...args) {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      callback(...args)
      rafId = null
    })
  }
}
