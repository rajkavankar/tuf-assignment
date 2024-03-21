import { NavLink } from "react-router-dom"

const Navbar = () => {
  const navLinks = [
    {
      id: 1,
      href: "/",
      title: "Home",
    },
    {
      id: 2,
      href: "/entries",
      title: "Code entries",
    },
  ]
  return (
    <nav className='p-5 shadow-md flex justify-between items-center'>
      <h1 className='text-3xl font-semibold'>Tuf</h1>
      <ul className='flex justify-center items-center gap-5'>
        {navLinks.map((item) => (
          <li key={item.id} className='text-lg'>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-black"
              }
              to={item.href}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
