import { Route, Routes } from "react-router-dom"
import { Home } from "../Sites/Home/Home"
import { NoPage } from '../Sites/NoPage/NoPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}