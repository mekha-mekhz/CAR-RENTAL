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
import Cart from "./pages/Cart"
import CustomerRegister from "./pages/CustomerRegister"
import AgencyRegister from "./pages/AgencyRegister"
import Cardetails from "./pages/Cardetails"
import BookingSummary from "./pages/BookingSummary"
import Wishlist from "./pages/Wishlist"
import CustomerDashboard from "./pages/CustomDash"
import RentalDashboard from "./pages/RentalDash"
import Payment from "./pages/Paymentfor"
import Support from "./pages/Support"
import AdminDashboard from "./pages/Adminverification"
import VehicleManagement from "./pages/Vehiclemanage"


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
            path: "/car/:carid", element: <Cardetails />
          },
          {
            path: "/register-customer", element: <CustomerRegister />
          }, {
            path: "/register-agency", element: <AgencyRegister />
          }, {
            path: "/booking-summary", element: <BookingSummary />
          }, {
            path: "/cart", element: <Cart />
          }, {
            path: "/wishlist", element: <Wishlist />
          }, {
            path: "/dashboard", element: <CustomerDashboard />
          }, {
            path: "/agencydash", element: <RentalDashboard />
          }, {
            path: "/payment", element: <Payment />
          }, {
            path: "/support", element: <Support />
          }, {
            path: "/admin", element: <AdminDashboard />
          }, {
            path: "/vehicle-management", element: <VehicleManagement />
          }

        ]
      }
    ]
  )

  return <RouterProvider router={router} />
}

export default App
