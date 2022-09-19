import { Route, Routes } from "react-router-dom"
import { Actors } from "../Sites/Actors/Actors"
import { Home } from "../Sites/Home/Home"
import { Login } from "../Sites/Login/Login"
import { NoPage } from '../Sites/NoPage/NoPage'
import { EventDetails } from "../Events/EventDetails"
import { EventsList } from "../Sites/PerformancesAndEvents/EventsList"

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/events">
        <Route index element={<EventsList />}/>
        <Route path=":evnet_id" element={<EventDetails/>}/>
      </Route>
      <Route path="/actors" element={<Actors/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}