import '@algolia/autocomplete-theme-classic'
import { initializeSearch } from './customSearch'
import { updateDescriptionOnQuery } from './description'
import { makeAutocomplete } from './autocomplete'
import { initializeSuggestions } from './suggestions'

initializeSearch(updateDescriptionOnQuery)
const autocomplete = makeAutocomplete()
initializeSuggestions(autocomplete.setQuery)
