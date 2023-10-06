export class TimerTask {
    taskName
    taskMinutes
    dateOfStart
    status
    id

    constructor(taskName: string, taskMinutes: string | number, dateOfStart: string | Date, status: string) {
        this.id = Math.random() * 10000000000000
        this.taskName = taskName
        this.taskMinutes = taskMinutes
        this.dateOfStart = dateOfStart
        this.status = status
    }
}