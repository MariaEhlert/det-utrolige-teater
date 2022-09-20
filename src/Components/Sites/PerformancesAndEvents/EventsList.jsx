import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../Helpers/Layout/Layout"
import { Hero } from "../../Hero/Hero"
import { EventItem } from "../../Events/EventItem";
import './EventList.scss';

export const EventsList = () => {
    const {event_id}= useParams(0);
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        const getEventList = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?dir=ASC');
                if (result.data) {
                    setEventList(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEventList();
    }, [])
    return(
        <Layout title='Forestillinger &#38; Events' description='Forestillinger &#38; Events'>
            <Hero/>

            <section className='eventListWrapper'>
            <h2 className="headline">Oversigt</h2>
            {eventList && eventList.map(events => {
                return(
                    <EventItem key={events.id} data={events} event_id={event_id}/>
                    )
                })}
                </section>
        </Layout>
    )
}