import { Route, Routes } from "react-router-dom"
import { Home } from "../Sites/Home/Home"
import { NoPage } from '../Sites/NoPage/NoPage'
import { EventsList } from "../Sites/PerformancesAndEvents/EventsList"

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/events">
        <Route index element={<EventsList />}/>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}