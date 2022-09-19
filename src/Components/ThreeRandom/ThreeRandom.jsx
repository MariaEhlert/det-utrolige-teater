import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'moment';
import { Link } from 'react-router-dom';
import './ThreeRandom.scss';

export const ThreeRandom = () => {
    const [randomList, setRandomList] = useState([]);
    useEffect(() => {
        const getRandomData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?orderby=rand()&limit=3');
                if (result.data) {
                    setRandomList(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRandomData();
    }, [])
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const startDate = Moment(randomList.startdate).format('DD-MM-YYYY')
    const stopDate = Moment(randomList.stopdate).format('DD-MM-YYYY')
    return (
        <section className="ThreeRandomWrapper">
            {randomList && randomList.map(events => {
                return (
                    <article className='eventsWrapper'>
                        <figure>
                            <img src={events.image} alt={events.title} />
                            <figcaption>
                                <p>{events.stage_name}</p>
                                <h6>{startDate} - {stopDate}</h6>
                                <hr />
                                <h2>{events.title}</h2>
                                <h3>{events.genre}</h3>
                                <div className='btnWrapper'>
                                    <Link to={''}><button className='readMore'>LÆS MERE</button></Link>
                                    <Link to={''}><button className='buyTicket'>KØB BILLET</button></Link>

                                </div>
                            </figcaption>
                        </figure>
                    </article>
                )

            })}

        </section>
    )
}