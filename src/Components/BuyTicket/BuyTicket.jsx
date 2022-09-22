import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../Helpers/Layout/Layout"
import Moment from "moment";
import { PostReservation } from "./PostReservation";
import { useAuth } from "../Helpers/Auth/Auth";
import style from './BuyTicket.module.scss';


export const BuyTicket = () => {
    const { event_id } = useParams();
    const [eventDetails, setEventDetails] = useState();
    const { loginData } = useAuth()
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
    // gemmer eventDetails i localStorage så event data kan bruges i showticket
    useEffect(() => {
        localStorage.setItem('event', JSON.stringify(eventDetails))
    }, [eventDetails])
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const StartDate = () => {
        const startDate = Moment(eventDetails.startdate).format('DD-MM-YYYY')
        return startDate
    }
    return (
        <Layout title='Køb billet' description='Køb billet'>
            <section className={style.buyTicketWrapper}>
                <h1>Køb billet</h1>
                <hr />
                {eventDetails && eventDetails ? (
                    <>
                        <article>
                            <figure>
                                <img src={eventDetails.image_medium} alt={eventDetails.id} />
                                <figcaption>
                                    <h4>{eventDetails.title}</h4>
                                    <h3>{StartDate()} KL. {eventDetails.starttime}</h3>
                                </figcaption>
                            </figure>
                        </article>
                        <article>
                            {loginData ? (
                                <PostReservation event_id={eventDetails.id} />
                                ) : (
                                    <>
                                    <p>Du skal være logget ind for at kunne bestille en billet</p>
                                </>
                            )}
                            <h4 >BILLETPRIS: {new Intl.NumberFormat("da").format(eventDetails.price)} DKK</h4>
                            <p>PRIS INKL. MOMS</p>
                        </article>
                    </>
                ) : (<>...Loading</>)
                }
            </section>
        </Layout>
    )
}