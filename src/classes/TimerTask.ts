export class TimerTask {
    nameOfTheTask
    minutesOfTheTask
    dateOfStart
    status
    id

    constructor(nameOfTheTask: string, minutesOfTheTask: string | number, dateOfStart: string | Date, status: string) {
        this.id = Math.random() * 10000000000000
        this.nameOfTheTask = nameOfTheTask
        this.minutesOfTheTask = minutesOfTheTask
        this.dateOfStart = dateOfStart
        this.status = status
    }
}