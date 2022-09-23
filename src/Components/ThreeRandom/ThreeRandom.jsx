import axios from "axios";
import { useEffect, useState } from "react";
import './ThreeRandom.scss';
import { EventItem } from "../Events/EventItem";
import { useParams } from "react-router-dom";

export const ThreeRandom = () => {
    const {event_id}= useParams(0);
    const [randomList, setRandomList] = useState([]);
    useEffect(() => {
        // henter 3 random evnets
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

    return (
        <section className='threeRandomWrapper'>
            {randomList && randomList.map(events => {
                return (
                    // sender data og event_id med som props
                    <EventItem key={events.id} data={events} event_id={event_id}/>
                )
            })}

        </section>
    )
}