import { Outlet } from "react-router"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function RootLayout() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-4 gap-4 bg-bgPrimary text-primary">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}