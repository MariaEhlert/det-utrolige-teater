import { Layout } from "../../Helpers/Layout/Layout"
import { Hero } from "../../Hero/Hero";
import { ThreeRandom } from "../../ThreeRandom/ThreeRandom";
import './Home.scss';

// https://api.mediehuset.net/detutroligeteater/events?limit=3

export const Home = () => {
    return(
        <Layout title='Forside' description='forside'>
            <Hero/>
            <ThreeRandom/>
        </Layout>
    )
}