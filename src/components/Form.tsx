import { FormEvent, useEffect, useState } from "react";
import { TimerTask } from "../entities/TimerTask";

export function Form() {
    const timerTasksList: TimerTask[] = JSON.parse(localStorage.getItem('timer-tasks-list') ?? '[]')

    const [minutesOfTheTask, setMinutesOfTheTask] = useState(5)
    const [nameOfTheTask, setNameOfTheTask] = useState('')

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
        if (isTimerOn && secondsInRealTime < 0) {
            interruptTimer()
        }
    }, [secondsInRealTime])

    function handleInputValueChange(ev: FormEvent<HTMLInputElement>) {
        setNameOfTheTask(ev.currentTarget.value)
    }

    function handleNumberInputValueChange(ev: FormEvent<HTMLInputElement>) {
        setMinutesOfTheTask(+ev.currentTarget.value)
    }

    function interruptTimer() {
        clearTimeout(timeOutId)

        const newTimerTask = new TimerTask(nameOfTheTask, minutesOfTheTask, new Date())

        setSecondsInRealTime(0)
        setIsTimerOn(!isTimerOn)
        setMinutes(0)
        setSeconds(0)
        setMinutesOfTheTask(5)
        setNameOfTheTask('')

        timerTasksList.push(newTimerTask)
        localStorage.setItem('timer-tasks-list', JSON.stringify(timerTasksList))
    }

    function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        if (isTimerOn) {
            return interruptTimer()
        }

        setIsTimerOn(!isTimerOn)

        setSecondsInRealTime((minutesOfTheTask * 60) - 1)
        setMinutes(minutesOfTheTask)
    }

    function isDecimalValidation(number: number) {
        if (number < 10) {
            return ("0")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="inputText">I'm going to work in </label>
                    <input type="text" id="inputText" disabled={isTimerOn ? true : false} value={nameOfTheTask} onChange={handleInputValueChange} required />
                    <label htmlFor="numberInput">for</label>
                    <input type="number" min={1} max={60} id="numberInput" value={minutesOfTheTask} onChange={handleNumberInputValueChange} disabled={isTimerOn ? true : false} />
                </div>

                <h1>{isDecimalValidation(minutes)}{minutes} : {isDecimalValidation(seconds)}{seconds}</h1>

                {
                    isTimerOn ?

                        <button>interrupt</button>

                        :
                        <button disabled={nameOfTheTask[0] ? false : true}>start</button>
                }
            </form>
        </>
    )
}