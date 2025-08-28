import Homepage from "./pages/Homepage"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Carlist from "./components/Carlist"
import BookingForm from "./pages/Bookingform"
import Filter from "./pages/Filter"

import CustomerRegister from "./pages/CustomerRegister"
import AgencyRegister from "./pages/AgencyRegister"
import Cardetails from "./pages/Cardetails"
import BookingSummary from "./pages/BookingSummary"


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
          }, {
            path: "/booking", element: <BookingForm />
          }, {
            path: "/search", element: <Filter />
          }, {
            path: "/cars/:carId", element: <Cardetails />
          },
          {
            path: "/register-customer", element: <CustomerRegister />
          }, {
            path: "/register-agency", element: <AgencyRegister />
          }, {
            path: "/booking-summary", element: <BookingSummary />
          }

        ]
      }
    ]
  )

  return <RouterProvider router={router} />
}

export default App
