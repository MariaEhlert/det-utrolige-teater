import { Layout } from "../../Helpers/Layout/Layout"
import { Hero } from "./Hero";
import './Home.scss';

// https://api.mediehuset.net/detutroligeteater/events?limit=3

export const Home = () => {
    return(
        <Layout title='Forside' description='forside'>
            <Hero/>
        </Layout>
    )
}