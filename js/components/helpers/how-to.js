const PREFIX = 'how to '

let howTo = true

export function setHowTo(newValue) {
  howTo = Boolean(newValue)
}

export const getHowTo = () => howTo

export const addPrefix = (query = '') => (
  !howTo || query.indexOf(PREFIX) === 0
    ? query
    : `${PREFIX}${query}`
)

export const removePrefix = (query) => (
  howTo && query.indexOf(PREFIX) === 0
    ? query.slice(PREFIX.length)
    : query
)
