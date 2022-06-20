const DESCRIPTION_CLASS = 'description'
const HIDDEN_CLASS = 'hidden'

export function updateDescriptionOnQuery(query) {
  if (!query.length) {
    return
  }

  const description = document.getElementsByClassName(DESCRIPTION_CLASS)
  if (description.length) {
    description[0].classList.add(HIDDEN_CLASS)
  }
}
