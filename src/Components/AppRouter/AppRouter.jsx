import { Route, Routes } from "react-router-dom"
import { Actors } from "../Sites/Actors/ActorsList"
import { Home } from "../Sites/Home/Home"
import { Login } from "../Sites/Login/Login"
import { NoPage } from '../Sites/NoPage/NoPage'
import { EventDetails } from "../Events/EventDetails"
import { EventsList } from "../Sites/PerformancesAndEvents/EventsList"
import { ActorsDetails } from "../Sites/Actors/ActorsDetails"

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/events">
        <Route index element={<EventsList />}/>
        <Route path=":event_id" element={<EventDetails/>}/>
      </Route>
      <Route path="/actors" >
        <Route index element={<Actors/>}/>
        <Route path=":actor_id" element={<ActorsDetails/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}