import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getHowTo, setHowTo as setHowToInSingleton } from './helpers/how-to'

export function HowToToggle() {
  const [howTo, setHowTo] = useState(getHowTo)
  useEffect(() => {
    setHowToInSingleton(howTo)
  }, [howTo])

  return (
    <span className={`prefix${howTo ? '' : ' dimmed'}`}>
      <label>
        <input
          type="checkbox"
          checked={howTo}
          onChange={({ target: { checked } }) => setHowTo(checked)}
        />
        How to
      </label>
    </span>
  )
}
