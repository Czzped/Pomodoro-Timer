import timer from "../assets/svgs/timer.svg"
import history from "../assets/svgs/history.svg"
import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/"><img src={timer} alt="timer-img" /></Link>
                    <Link to="/history"><img src={history} alt="history-img" /></Link>
                </li>
            </ul>
        </nav>
    )
}