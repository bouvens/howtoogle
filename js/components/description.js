import { h } from 'preact'
import logo from '/img/logo.svg'
import { makeSuggestion } from './suggestion'

export function Description({ query, setQuery }) {
  if (query?.length) {
    return null
  }
  const Suggestion = makeSuggestion(setQuery)
  return (
    <div className="description">
      <p><img className="logo-inline" src={logo} alt="howTOogle" /> is a search engine for
        professionals, scientists, researchers, web development gurus, and everyone else.</p>
      <p><strong>Check now how to </strong>
        <Suggestion text="make a website" />
        , <Suggestion text="eat and not gain weight" />
        , <Suggestion text="build a chicken coop" />
        , <Suggestion text="make money with a chicken coop" />
        , <Suggestion text="buy a house with no money" />
        , <Suggestion text="hack Google" />
        , and everything you can imagine.</p>
    </div>
  )
}
