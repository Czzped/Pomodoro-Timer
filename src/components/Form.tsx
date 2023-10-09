import { FormEvent, useEffect, useState } from "react";
import { TimerTask } from "../entities/TimerTask";

export function Form() {
    let timeOutId = 0
    const timerCycleId = parseFloat(localStorage.getItem('timer-cycle-id') ?? '0')

    const timerTasksList: TimerTask[] = JSON.parse(localStorage.getItem('timer-tasks-list') ?? '[]')
    const timerTaskOnCycle = timerTasksList.find((task) => task.id === timerCycleId)
    const timerTaskToUpdateIndex = timerTasksList.indexOf(timerTaskOnCycle)


    const [minutesOfTheTask, setMinutesOfTheTask] = useState(5)
    const [nameOfTheTask, setNameOfTheTask] = useState(timerTaskOnCycle?.nameOfTheTask ?? '')

    const [secondsInRealTime, setSecondsInRealTime] = useState(Number(localStorage.getItem('storeged-seconds-in-real-time') ?? '0'))

    const [isTimerOn, setIsTimerOn] = useState(secondsInRealTime > 0 ? true : false)

    const [minutes, setMinutes] = useState(isTimerOn ? Math.floor((secondsInRealTime - 1) / 60) : 0)
    const [seconds, setSeconds] = useState(isTimerOn ? (secondsInRealTime - 1) % 60 : 0)

    useEffect(() => {
        if (isTimerOn && secondsInRealTime > 0) {
            timeOutId = setTimeout(() => {
                setSecondsInRealTime(secondsInRealTime => secondsInRealTime - 1)

                setMinutes(Math.floor((secondsInRealTime - 1) / 60))
                setSeconds((secondsInRealTime - 1) % 60)

                storageSeconds()
            }, 1000)
        }
        if (isTimerOn && secondsInRealTime <= 0) {
            updateTask(timerCycleId, 'completed')
            interruptTimer()
            storageSeconds()
        }
    }, [secondsInRealTime])

    function storageSeconds(number?: number) {
        localStorage.setItem('storeged-seconds-in-real-time', JSON.stringify(number ?? secondsInRealTime))
    }

    function updateTask(timerCycleId: number, newTaskStatus: string) {
        const newTimerTask = new TimerTask(nameOfTheTask, minutesOfTheTask, new Date(), newTaskStatus)

        timerTasksList[timerTaskToUpdateIndex] = newTimerTask

        localStorage.setItem('timer-tasks-list', JSON.stringify(timerTasksList))
    }

    function handleInputValueChange(ev: FormEvent<HTMLInputElement>) {
        setNameOfTheTask(ev.currentTarget.value)
    }

    function handleNumberInputValueChange(ev: FormEvent<HTMLInputElement>) {
        setMinutesOfTheTask(+ev.currentTarget.value)
    }

    function interruptTimer() {
        setIsTimerOn(false)
        setSecondsInRealTime(0)
        setMinutes(0)
        setSeconds(0)
        setMinutesOfTheTask(5)
        setNameOfTheTask('')

        storageSeconds(0)

        clearTimeout(timeOutId)
    }

    function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        if (isTimerOn) {
            updateTask(timerCycleId, 'interrupted')
            interruptTimer()

            return
        }

        setIsTimerOn(!isTimerOn)

        setSecondsInRealTime((minutesOfTheTask * 60) - 1)
        setMinutes(minutesOfTheTask)

        const newTimerTask = new TimerTask(nameOfTheTask, minutesOfTheTask, new Date(), 'in progress')

        timerTasksList.push(newTimerTask)
        localStorage.setItem('timer-tasks-list', JSON.stringify(timerTasksList))
        localStorage.setItem('timer-cycle-id', JSON.stringify(newTimerTask.id))
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