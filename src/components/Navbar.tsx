import { Link } from "react-router-dom"
import { Timer, Scroll } from 'phosphor-react'

export function Navbar() {
    return (
        <nav>
            <ul className="flex gap-2">
                <li className="border-b-2 border-bgPrimary hover:border-primary">
                    <Link to="/" >
                        <Timer size={24} />
                    </Link>
                </li>
                <li className="border-b-2 border-bgPrimary hover:border-primary">
                    <Link to="/history">
                        <Scroll size={24} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}