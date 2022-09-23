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
        //henter evnet detaljer
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

            <>
                {/* conditional ternary operator */}
                {/* hvis eventDetails er sat vises event data ellers vises loading besked*/}
                {eventDetails && eventDetails ? (
                    <section className={style.buyTicketWrapper}>
                        <div className={style.eventWrapper}>
                            <figure className={style.eventImageWrapper}>
                                <img src={eventDetails.image_medium} alt={eventDetails.id} />
                            </figure>
                            <article className={style.eventInfoWrapper}>
                                <figcaption>
                                    <h1>Køb billet</h1>
                                    <hr />
                                    <h4>{eventDetails.title}</h4>
                                    <h3>{StartDate()} KL. {eventDetails.starttime}</h3>
                                    {/* omskriver til danske priser */}
                                    <h4 >BILLETPRIS: {new Intl.NumberFormat("da").format(eventDetails.price)} DKK</h4>
                                    <p>PRIS INKL. MOMS</p>
                                </figcaption>
                            </article>
                        </div>
                        <article className={style.formWrapper}>
                            {/* conditional ternary operator */}
                            {/* hvis bruger er logget ind vises reservation form eller login besked */}
                            {loginData ? (
                                <PostReservation event_id={eventDetails.id} />
                            ) : (
                                <>
                                    <p className={style.notLoginText}>Du skal være logget ind for at kunne bestille en billet</p>
                                </>
                            )}
                        </article>

                    </section>
                ) : (<>...Loading</>)
                }
            </>
        </Layout>
    )
}
