import { Outlet } from "react-router"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function RootLayout() {
    return (
        <div className="flex flex-col justify-between h-screen p-4">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}