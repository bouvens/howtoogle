import { h, Fragment } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getSuggestions, initializeSearch, updateSearch } from '../custom-search'
import { Autocomplete } from './autocomplete'
import { Description } from './description'
import { setHowTo as setHowToInSingleton } from '../how-to'

export function App() {
  const [changeQuery, setChangeQuery] = useState()
  const saveQuery = useCallback((func) => setChangeQuery(() => func), [setChangeQuery])

  const [howTo, setHowTo] = useState(true)
  useEffect(() => {
    setHowToInSingleton(howTo)
  }, [howTo])

  const [query, setQuery] = useState()
  useEffect(() => {
    initializeSearch(setQuery)
  }, [])

  return (
    <Fragment>
      <div className="search">
        <span className={`prefix${howTo ? '' : ' dimmed'}`}>
          <label><input
            type="checkbox"
            checked={howTo}
            onChange={({ target: { checked } }) => setHowTo(checked)}
          />How to</label></span>
        <Autocomplete
          autoFocus={false}
          openOnFocus
          setQuery={saveQuery}
          getSuggestions={getSuggestions}
          onStateChange={({ state: { isOpen, query } }) => {
            if (!isOpen && query.length) {
              setQuery(query)
              updateSearch(query)
            }
          }}
        />
      </div>
      <Description query={query} setQuery={changeQuery} />
    </Fragment>
  )
}