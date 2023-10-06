export class TimerTask {
    taskName
    taskMinutes
    dateOfStart
    id

    constructor(taskName: string, taskMinutes: string | number, dateOfStart: string | Date) {
        this.id = Math.random() * 10000000000000
        this.taskName = taskName
        this.taskMinutes = taskMinutes
        this.dateOfStart = dateOfStart
    }
}