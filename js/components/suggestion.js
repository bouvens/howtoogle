import { h } from 'preact'

export const makeSuggestion = (setQuery = () => {}) =>
  function Suggestion({ text }) {
    return (
      <span className="suggestion" title="Search Now" onClick={() => setQuery(text)}>{text}</span>
    )
  }
