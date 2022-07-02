import { useCallback, useEffect, useState } from 'preact/hooks'

const SEARCH_COUNT_KEY = 'howTOogle-counter'

// one week
const THRESHOLD_SEC = 60 * 60 * 24 * 7
// one minute
const CLEAR_TIMEOUT_MS = 60 * 1000

const getCurrentTimeSec = () => Math.floor(Date.now() / 1000)

function removeOldCounts(counter) {
  const cleared = [...counter]
  while (getCurrentTimeSec() - cleared[0] > THRESHOLD_SEC) {
    cleared.shift()
  }
  return counter.length === cleared.length ? counter : cleared
}

export function useCount() {
  const [searchCount, setSearchCount] = useState(() => {
    let count
    try {
      count = JSON.parse(window.localStorage.getItem(SEARCH_COUNT_KEY))
    } catch {}
    return removeOldCounts(count || [])
  })

  useEffect(() => {
    window.localStorage.setItem(SEARCH_COUNT_KEY, JSON.stringify(searchCount))
  }, [searchCount])

  useEffect(() => {
    const timer = setInterval(() => {
      const newCount = removeOldCounts(searchCount)
      if (newCount !== searchCount) {
        setSearchCount(newCount)
      }
    }, CLEAR_TIMEOUT_MS)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const incrementCount = useCallback(() => {
    setSearchCount((count) => [...count, getCurrentTimeSec()])
  }, [])

  return [searchCount.length, incrementCount]
}
