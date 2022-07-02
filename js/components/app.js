import { h, Fragment } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getSuggestions, initializeSearch, updateSearch } from '../custom-search'
import { getHowTo } from './helpers/how-to'
import logo from '/img/logo.svg'
import { HowToToggle } from './how-to-toggle'
import { Autocomplete } from './autocomplete'
import { Description } from './description'
import { useCount } from './helpers/use-count'

export function App() {
  const [changeQuery, setChangeQuery] = useState(() => () => {})
  const saveQuery = useCallback((func) => setChangeQuery(() => func), [setChangeQuery])

  const [searchCount, incrementCount] = useCount()

  const [query, setQuery] = useState()
  useEffect(() => {
    initializeSearch((query) => {
      setQuery(query)
      if (getHowTo()) {
        incrementCount()
      }
    })
  }, [])

  const onSearch = useCallback((query) => {
    setQuery(query)
    updateSearch(query)
  }, [])

  return (
    <Fragment>
      <header>
        <div className="logo-wrapper">
          <a href=".">
            <img className="logo" src={logo} alt="howTOogle" />
          </a>
          {!!searchCount &&
            <div className="search-count" title="Your How-To Searches Last Week">{searchCount}</div>}
        </div>
      </header>

      <div className="search">
        <HowToToggle />
        <Autocomplete
          autoFocus={false}
          openOnFocus
          setQuery={saveQuery}
          getSuggestions={getSuggestions}
          onSearch={onSearch}
        />
      </div>
      <Description query={query} setQuery={changeQuery} />
    </Fragment>
  )
}
