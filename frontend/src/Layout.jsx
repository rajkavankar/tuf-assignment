import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"

const Layout = () => {
  return (
    <div className='bg-primary-foreground min-h-screen'>
      <Navbar />
      <main>
        <Toaster position='top-center' reverseOrder={false} />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
