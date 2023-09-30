import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export function App() {
  const [inputValue, setInputValue] = useState('')
  const [secondsInRealTime, setSecondsInRealTime] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)


  useEffect(() => {
    if (secondsInRealTime >= 0) {
      setTimeout(() => {
        setMinutes(Math.floor(secondsInRealTime / 60))
        setSeconds(secondsInRealTime % 60)

        setSecondsInRealTime(secondsInRealTime => secondsInRealTime - 1)
      }, 1000)
    }

  }, [secondsInRealTime])

  function handleInputValueChange(ev: ChangeEvent<HTMLInputElement>) {
    setInputValue(ev.currentTarget.value)
  }

  function handleSubmit(ev: FormEvent<SubmitEvent>) {
    ev.preventDefault()

    setSecondsInRealTime(+inputValue * 60)
    setMinutes(+inputValue)

    console.log('test')
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
      </form>
      <h1>{isDecimalValidation(minutes)}{minutes} : {isDecimalValidation(seconds)}{seconds}</h1>
    </>
  )
}