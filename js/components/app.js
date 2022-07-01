import { h, Fragment } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getSuggestions, initializeSearch, updateSearch } from '../customSearch'
import { Autocomplete } from './autocomplete'
import { Description } from './description'

export function App() {
  const [query, setQuery] = useState()
  const [changeQuery, setChangeQuery] = useState()
  const saveQuery = useCallback((func) => setChangeQuery(() => func), [setChangeQuery])
  useEffect(() => {
    initializeSearch(setQuery)
  }, [])

  return (
    <Fragment>
      <div className="search">
        <span className="prefix">How to</span>
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
