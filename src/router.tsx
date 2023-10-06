import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />, // Aqui é o componente que eu desjo colocar
      },
      {
        path: "history",
        element: <Home />, // Aqui é o componente que eu desjo colocar
      }
    ],
  },
]);

export default router