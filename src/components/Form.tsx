import { FormEvent, useEffect, useState } from "react";
import { TimerTask } from "../entities/TimerTask";

export function Form() {
    let timeOutId = 0
    const timerCycleId = parseFloat(localStorage.getItem('timer-cycle-id') ?? '0')

    const abledButtonClass = "h-12 cursor-pointer rounded text-bgSecondary font-bold bg-primary hover:opacity-80"
    const unabledButtonClass = "h-12 cursor-not-allowed rounded text-bgSecondary font-bold bg-primary hover:opacity-80"

    const timerTasksList: TimerTask[] = JSON.parse(localStorage.getItem('timer-tasks-list') ?? '[]')
    const timerTaskOnCycle = timerTasksList.find((task) => task.id === timerCycleId) as TimerTask
    const timerTaskToUpdateIndex = timerTasksList.indexOf(timerTaskOnCycle)


    const [minutesOfTheTask, setMinutesOfTheTask] = useState(5)
    const [nameOfTheTask, setNameOfTheTask] = useState(timerTaskOnCycle?.nameOfTheTask ?? '')

    const [secondsInRealTime, setSecondsInRealTime] = useState(Number(localStorage.getItem('storeged-seconds-in-real-time') ?? '0') - 1)

    const [isTimerOn, setIsTimerOn] = useState(secondsInRealTime > 0 ? true : false)

    const [minutes, setMinutes] = useState(isTimerOn ? Math.floor((secondsInRealTime) / 60) : 0)
    const [seconds, setSeconds] = useState(isTimerOn ? (secondsInRealTime) % 60 : 0)

    useEffect(() => {
        if (isTimerOn && secondsInRealTime >= 0) {
            timeOutId = setTimeout(() => {
                storageSeconds()

                setSecondsInRealTime(secondsInRealTime => secondsInRealTime - 1)

                setMinutes(Math.floor((secondsInRealTime - 1) / 60))
                setSeconds((secondsInRealTime) % 60)
            }, 1000)
        }
        if (isTimerOn && secondsInRealTime === -1) {
            console.log('tes')

            updateTaskStatus('completed')
            interruptTimer()
            storageSeconds()
        }
    }, [secondsInRealTime])

    function storageSeconds(number?: number) {
        localStorage.setItem('storeged-seconds-in-real-time', JSON.stringify(number ?? secondsInRealTime))
    }

    function updateTaskStatus(newTaskStatus: string) {
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
            updateTaskStatus('interrupted')
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
            <form onSubmit={handleSubmit}
                className="flex flex-col py-12 px-8 justify-center itens-center text-center gap-10 h-full"
            >
                <div className="flex flex-wrap gap-4 text-center items-center w-full">
                    <label htmlFor="inputText" className="text-2xl">I'm going to work in </label>
                    <input type="text"
                        id="inputText"
                        className="max-w-[50vw] bg-transparent outline-none border-b-4 border-secondary text-2xl transition-all focus:border-primary"
                        disabled={isTimerOn ? true : false} required
                        value={nameOfTheTask} onChange={handleInputValueChange}
                    />
                    <label htmlFor="numberInput" className="text-2xl">for</label>
                    <input type="number"
                        id="numberInput"
                        className="bg-transparent outline-none border-b-4 border-secondary text-2xl transition-all focus:border-primary"
                        min={1} max={60}
                        value={minutesOfTheTask} onChange={handleNumberInputValueChange}
                        disabled={isTimerOn ? true : false} />
                </div>

                <h1 className="text-[60px] font-bold md:text-9xl">
                    {isDecimalValidation(minutes)}{minutes} : {isDecimalValidation(seconds)}{seconds}
                </h1>

                <button
                    disabled={nameOfTheTask[0] ? false : true}
                    className={nameOfTheTask[0] ? abledButtonClass : unabledButtonClass}
                >

                    {
                        isTimerOn ?
                            'interrupt'

                            :
                            'start'
                    }
                </button>
            </form >
        </>
    )
}