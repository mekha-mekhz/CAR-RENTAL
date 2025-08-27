import Homepage from "./pages/Homepage"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Carlist from "./components/Carlist"


function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/", element: <Homepage />
          },
          {
            path: "/login", element: <Login />,
          },
          {
            path: "/register", element: <Register />
          },
          {
            path: "/about", element: <About />
          },
          {
            path: "/contact", element: <Contact />
          }, {
            path: "/cars", element: <Carlist />
          }

        ]
      }
    ]
  )

  return <RouterProvider router={router} />
}

export default App
