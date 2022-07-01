import { h, createElement, Fragment, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import { autocomplete } from '@algolia/autocomplete-js'
import '@algolia/autocomplete-theme-classic'
import { updateSearch } from '../custom-search'

export function Autocomplete({ setQuery, getSuggestions, onSearch, ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render },
      getSources: () => [
        {
          sourceId: 'suggestions',
          getItems({ query }) {
            return getSuggestions(query).then((items) =>
              items.map((label) => ({ label })))
          },
          getItemInputValue({ item }) {
            return item.label
          },
          templates: {
            item({ item, html }) {
              return html`${item.label}`
            },
          },
        },
      ],
      onStateChange: ({ state: { isOpen, query } }) => {
        if (!isOpen && query.length) {
          onSearch(query)
        }
      },
      ...props,
    })
    setQuery(search.setQuery)

    return () => {
      search.destroy()
    }
  }, [setQuery])

  return <div id="search-box" ref={containerRef} />
}
