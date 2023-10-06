import { Outlet } from "react-router"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function RootLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}