import axios from 'axios';
import { useEffect, useState } from 'react';
import './Hero.scss';
import Moment from 'moment';

export const Hero = () => {
    const [heroData, setHeroData] = useState([]);
    useEffect(() => {
        //henter event nummer 5
        const getHeroData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events/5');
                if (result.data) {
                    setHeroData(result.data.item);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHeroData();
    }, [])
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const startDate = Moment(heroData.startdate).format('DD-MM-YYYY')
    const stopDate = Moment(heroData.stopdate).format('DD-MM-YYYY')
    return (
        <article className='heroWrapper'>
            {/* conditional ternary operator */}
            {/* hvis heroData så vises eventet eller loading besked */}
            {heroData ? (
                <figure>
                    <figcaption>
                        <p>{heroData.stage_name}</p>
                        <h6>{startDate} - {stopDate}</h6>
                        <hr />
                        <h2>{heroData.title}</h2>
                        <h3>{heroData.genre}</h3>
                    </figcaption>
                    <img src={heroData.image_medium} alt={heroData.title} />
                </figure>
            ) : (<>..Loading</>)}
        </article>
    )
}