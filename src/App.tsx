import { RouterProvider } from "react-router";
import router from "./store/router";

export function App() {
  return (
    <RouterProvider router={router} />
  )
}