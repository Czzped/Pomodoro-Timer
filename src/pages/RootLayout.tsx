import { Outlet } from "react-router"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function RootLayout() {
    return (
        <div className="flex flex-col items-center justify-between h-screen p-4">
            <Header />
            <main className="py-8 flex justify-center bg-bgSecondary w-[80vw] min-h-[50vh] rounded-lg lg:w-[50vw]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}