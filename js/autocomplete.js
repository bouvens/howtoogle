import { autocomplete } from '@algolia/autocomplete-js'
import { getSuggestions, updateSearch } from './customSearch'

export const makeAutocomplete = () => autocomplete({
  container: '#search-box',
  autoFocus: false,
  openOnFocus: true,
  // this hack is for background CSS image
  placeholder: ' ',
  classNames: {
    input: 'search-input',
  },
  getSources() {
    return [
      {
        sourceId: 'suggestions',
        getItems({ query }) {
          return getSuggestions(query)
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
    ]
  },
  onStateChange({ state: { isOpen, query } }) {
    if (!isOpen && query.length) {
      updateSearch(query)
    }
  },
})
