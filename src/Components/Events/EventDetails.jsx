import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "moment";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../Helpers/Layout/Layout"
import style from './EventDetails.module.scss';
import { EventComment } from "../EventsComment/EventComment";
export const EventDetails = () => {
    const { event_id } = useParams();
    const [eventDetails, setEventDetails] = useState();
    useEffect(() => {
        const getEventDetails = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`);
                if (result.data) {
                    setEventDetails(result.data.item);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEventDetails();
    }, [event_id])
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const StartDate = () => {
        const startDate = Moment(eventDetails.startdate).format('DD-MM-YYYY')
        return startDate
    }
    const StopDate = () => {
        const stopDate = Moment(eventDetails.stopdate).format('DD-MM-YYYY')
        return stopDate
    }
    return (
        <Layout title='Forestillinger &#38; Events Detaljer' description='Forestillinger &#38; Events Detaljer'>
            {eventDetails && eventDetails ? (
                <section className={style.detailsWrapper}>
                    <figure>
                        <article className={style.imageWrapper}>
                            <div className={style.likeWrapper}>
                                <button><img src={require('../../Assets/Image/Like-icon.png')} alt='like-icon' /></button>
                            </div>
                            {/* {check ? (<img src={require('../../Assets/Image/Like-icon-toggle.png')} alt='like-icon' />) : (<img src={require('../../Assets/Image/Like-icon.png')} alt='like-icon' />)} */}
                            <div className={style.eventImage}>
                                <img src={eventDetails.image} alt={eventDetails.title} />
                            </div>
                        </article>
                        <figcaption>
                            <h6>{eventDetails.stage_name}</h6>
                            <div className={style.infoheadWrapper}>
                                <h3 className={style.place}>{StartDate()} - {StopDate()}</h3>
                                <h3 className={style.price}>BILLETPRIS: {new Intl.NumberFormat("da").format(eventDetails.price)}</h3>
                            </div>
                            <hr></hr>
                            <h2>{eventDetails.title}</h2>
                            <h3>{eventDetails.genre}</h3>
                            <div className={style.buyTicket}>
                                <Link to={''}><button >KØB BILLET</button></Link>
                            </div>
                            <div className={style.descriptionWrapper}>
                                <p>{eventDetails.description}</p>
                                <p>Vardighed ca. {eventDetails.duration_minutes} minutter</p>
                            </div>
                        </figcaption>
                    </figure>
                    <h3 className={style.actorsHeading}>MEDVIRKENDE</h3>
                    <article className={style.actorsWrapper}>
                        {eventDetails.actors && eventDetails.actors.map(item => {
                            return (
                                <Link to={`/actors/${item.id}`} key={item.id}>
                                    <figure>
                                        <img src={item.image} alt={item.name} />
                                        <figcaption>
                                            <p>{item.name}</p>
                                        </figcaption>
                                    </figure>
                                </Link>
                            )
                        })}
                    </article>
                    <EventComment event_id={event_id}/>
                </section>
            ) :
                (<>...Loading</>)
            }


        </Layout>
    )
}