import { TimerTask } from "../entities/TimerTask"
import moment from "moment"

export function History() {
    const timerTasksList: TimerTask[] = JSON.parse(localStorage.getItem('timer-tasks-list') ?? '[]')

    return (
        <section>
            <h2>My <span>History</span></h2>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Duration</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timerTasksList.map(({ id, nameOfTheTask, minutesOfTheTask, dateOfStart, status }) => {
                            return (
                                <tr key={id}>
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
        </section >
    )
}