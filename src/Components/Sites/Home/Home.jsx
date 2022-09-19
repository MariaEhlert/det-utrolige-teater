import { Link } from "react-router-dom";
import { Layout } from "../../Helpers/Layout/Layout"
import { Hero } from "../../Hero/Hero";
import { ThreeRandom } from "../../ThreeRandom/ThreeRandom";
import styles from './Home.module.scss';

// https://api.mediehuset.net/detutroligeteater/events?limit=3

export const Home = () => {
    return(
        <Layout title='Forside' description='forside'>
            <Hero/>
            <ThreeRandom/>
            <div className={styles.seeAllBtn}>
                <Link to={'/events'}><button>SE ALLE FORESTILLINGER</button></Link>
            </div>
        </Layout>
    )
}