import { TimerTask } from "../entities/TimerTask"
import moment from "moment"

export function History() {
    const timerTasksList: TimerTask[] = JSON.parse(localStorage.getItem('timer-tasks-list') ?? '[]')

    return (
        <section className="flex bg-bgSecondary w-[75vw] rounded-lg lg: min-h-[70vh]">
            <table className="flex flex-col h-full min-w-full rounded text-xs sm:text-base">
                <thead>
                    <tr className="grid grid-cols-4 rounded-t-lg border-4 p-4">
                        <th>Task</th>
                        <th>Duration</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col">
                    {
                        timerTasksList.map(({ id, nameOfTheTask, minutesOfTheTask, dateOfStart, status }) => {
                            return (
                                <tr className="grid grid-cols-4 h-20 font-bold text-center  p-4" key={id}>
                                    <td>{nameOfTheTask}</td>
                                    <td>{minutesOfTheTask}</td>
                                    <td>{moment(dateOfStart).fromNow()}</td>
                                    <td>{status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}