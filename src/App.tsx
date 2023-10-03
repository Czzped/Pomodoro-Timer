import { FormEvent, useEffect, useState } from "react";

export function App() {
  const [numberInputValue, setNumberInputValue] = useState(5)
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

  function handleNumberInputValueChange(ev: FormEvent<Number>) {
    setNumberInputValue(ev.currentTarget.valueOf)
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    if (isTimerOn) {
      clearTimeout(timeOutId)

      setSecondsInRealTime(0)
      setIsTimerOn(!isTimerOn)
      setMinutes(0)
      setSeconds(0)
      setNumberInputValue(5)
      setInputValue('')

      console.log({
        name: inputValue,
        time: numberInputValue
      })

      return
    }
    setIsTimerOn(!isTimerOn)

    setSecondsInRealTime((numberInputValue * 60) - 1)
    setMinutes(numberInputValue)
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
        <div>
          <label htmlFor="inputText">I'm going to work in </label>
          <input type="text" id="inputText" disabled={isTimerOn ? true : false} value={inputValue} onChange={handleInputValueChange} required />
          <label htmlFor="numberInput">for</label>
          <input type="number" min={1} max={60} id="numberInput" value={numberInputValue} onChange={handleNumberInputValueChange} disabled={isTimerOn ? true : false} />
        </div>
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