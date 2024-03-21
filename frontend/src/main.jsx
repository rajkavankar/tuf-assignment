import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Layout from "./Layout.jsx"
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import "./index.css"
import MainPage from "./pages/MainPage.jsx"
import CodeEntriesPage from "./pages/CodeEntriesPage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<MainPage />} />
      <Route path='/entries' element={<CodeEntriesPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
