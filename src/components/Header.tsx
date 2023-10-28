import { Navbar } from "./Navbar"

export function Header() {
    return (
        <header className="flex flex-col justify-center items-center h-[15vh] gap-4">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-4xl font-bold">pomodoro</h1>
                <Navbar />
            </div>
            <hr className="w-[75vw] h-[0.4rem] bg-secondary border-none rounded-[0.125rem]" />
        </header >
    )
}