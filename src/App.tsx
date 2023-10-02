import { FormEvent, useEffect, useState } from "react";

export function App() {
  const [inputValue, setInputValue] = useState('')

  const [secondsInRealTime, setSecondsInRealTime] = useState(0)

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const [isTimerOn, setIsTimerOn] = useState(false)

  let timeOutId = 0

  useEffect(() => {
    if (secondsInRealTime >= 0) {
      timeOutId = setTimeout(() => {
        setMinutes(Math.floor(secondsInRealTime / 60))
        setSeconds(secondsInRealTime % 60)

        setSecondsInRealTime(secondsInRealTime => secondsInRealTime - 1)
      }, 1000)
    }
    if (secondsInRealTime < 0) {
      setIsTimerOn(false)
    }
  }, [secondsInRealTime])

  function handleInputValueChange(ev: FormEvent<HTMLInputElement>) {
    setInputValue(ev.currentTarget.value)
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    if (isTimerOn) {
      clearTimeout(timeOutId)

      setSecondsInRealTime(0)
      setIsTimerOn(!isTimerOn)
      setMinutes(0)
      setSeconds(0)

      return
    }
    setIsTimerOn(!isTimerOn)

    setSecondsInRealTime((+inputValue * 60) - 1)
    setMinutes(+inputValue)
  }

  function isDecimalValidation(number: number) {
    if (number < 10) {
      return ("0")
    }
  }

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Say the Minutes: </label>
        <input type="number" min={1} max={60} id="input" value={inputValue} onChange={handleInputValueChange} />
        {
          isTimerOn ?

            <button>interrupt</button>

            :
            <button disabled={inputValue[0] ? false : true}>start</button>
        }
      </form>
      <h1>{isDecimalValidation(minutes)}{minutes} : {isDecimalValidation(seconds)}{seconds}</h1>
    </>
  )
}