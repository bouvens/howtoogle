const SUGGESTION_CLASSNAME = 'suggestion'
const SUGGESTION_TITLE = 'Search Now'

export function initializeSuggestions(setQuery) {
  Array.prototype.forEach.call(document.getElementsByClassName(SUGGESTION_CLASSNAME), (element) => {
    element.addEventListener('click', (event) => {
      const text = event.target.innerText
      setQuery(text)
    })
    element.setAttribute('title', SUGGESTION_TITLE)
  })
}
