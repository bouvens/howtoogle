import { addPrefix, removePrefix } from './components/helpers/how-to'

const GLOBAL_AUTOCOMPLETE_CALLBACK = 'accb'
let callbackIndex = 0

export function initializeSearch(cb = () => {}) {
  function searchStartingCallback(gname, query) {
    cb(query)
    return addPrefix(query)
  }

  window.__gcse = {
    ...window.__gcse, searchCallbacks: {
      image: {
        starting: searchStartingCallback,
      }, web: {
        starting: searchStartingCallback,
      },
    },
  }
}

const getGlobalName = (index) => `${GLOBAL_AUTOCOMPLETE_CALLBACK}${index}`

function makeOneTimeCallback(cb = () => {}) {
  const index = callbackIndex
  callbackIndex++
  const oneTimeCallback = (data) => {
    delete window[getGlobalName(index)]
    cb(data)
  }
  window[getGlobalName(index)] = oneTimeCallback
  oneTimeCallback.index = index
  return oneTimeCallback
}


function runJsonp(src) {
  const script = document.createElement('script')
  script.setAttribute('src', src)
  document.head.appendChild(script)
  document.head.removeChild(script)
}

function get30Suggestions(query, cbName) {
  runJsonp(
    `https://clients1.google.com/complete/search?client=partner-web&gs_ri=partner-web&partnerid=50f477674d6f54f93&ds=cse&q=${encodeURIComponent(
      query)}&callback=${cbName}`)
}

// with HTML markup
function get10Suggestions(query) {
  runJsonp(`https://www.google.com/complete/search?client=psy-ab&q=${encodeURIComponent(
    query)}&jsonp=${GLOBAL_AUTOCOMPLETE_CALLBACK}&_=${Math.random()}`)
}

export const getSuggestions = (query) => new Promise((resolve) => {
  const preparedQuery = addPrefix(query)
  if (!preparedQuery.length) {
    resolve([])
    return
  }
  const callback = makeOneTimeCallback((data) => {
    resolve(data[1].map((item) => removePrefix(item[0])))
  })
  get30Suggestions(preparedQuery, getGlobalName(callback.index))
})

export function updateSearch(query) {
  window.location.href = `./#gsc.tab=0&gsc.sort=&gsc.q=${addPrefix(query)}`
}
