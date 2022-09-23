import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader } from "../Helpers/Auth/Auth";
import Moment from "moment";
import { Link } from "react-router-dom";
import style from './ApproveTicket.module.scss'

export const ApproveTicket = () => {
    const [approveTicket, setApproveTicket] = useState([]);
    const [ticketNumber, setTicketNumber] = useState();
    // henter billet nummer i localStorage som blev sat i PostReservation.jsx
    useEffect(() => {
        const ticketNumber = JSON.parse(localStorage.getItem('ticket-id'));
        if (ticketNumber) {
            setTicketNumber(ticketNumber);
        }
        // henter billet data
        const getTicketData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/reservations', { headers: authHeader() });
                if (result.data) {
                    setApproveTicket(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTicketData();
    }, []);

    return (
        <section className={style.approveTicketWrapper}>
            <article className={style.ticketWrapper}>

                <EventData />
                {/* filtrer efter om approveTicket id er lige ticketNumber id (som ligger i localStorage) */}
                {/* mapper derfor kun det data som passer til billet id'et */}
                {approveTicket.filter(user => user.id == ticketNumber).map(item => {
                    // sletter reservationen hvis der bliver klikket på tilbage knappen
                    const deleteFarvorite = async () => {
                        await axios.delete(`https://api.mediehuset.net/detutroligeteater/reservations/${item.id}`, { headers: authHeader() })
                        window.location.reload(false);
                    }
                    return (
                        <article key={item.id} className={style.ticketInfo}>
                            <h4>KUNDE:</h4>
                            <p>{item.firstname} {item.lastname}</p>
                            <p>{item.address}</p>
                            <p>{item.zipcode} {item.city}</p>
                            <p>EMAIL: {item.email}</p>
                            <h3>BILLETTERNE SENDES ELEKTRONISK TIL DIN MAIL</h3>
                            <div className={style.btnWrapper}>
                                <Link to={'/events'}><button onClick={() => deleteFarvorite()}>TILBAGE</button></Link>
                                <Link to={'/thankyou'}><button>GODKEND BESTILLING</button></Link>
                            </div>
                        </article>
                    )
                })}
            </article>
        </section>
    )

}
const EventData = () => {
    const [event, setEvent] = useState([]);
    useEffect(() => {
        // henter event data fra localStorage som blev sat i BuyTicket.jsx
        const eventData = JSON.parse(localStorage.getItem('event'));
        if (eventData) {
            setEvent(eventData);
        }
    }, []);
    //Moment er en npm pakke
    // gør at datoen kommer ud som dag, månede og år
    const StartDate = () => {
        const startDate = Moment(event.startdate).format('DD-MM-YYYY')
        return startDate
    }
    return (
        <article className={style.eventWrapper}>
            {/* conditional ternary operator */}
            {/* hvis evenet er sat vises event data eller loading besked */}
            {event && event ? (
                <>
                    <figure>
                        <img src={event.image_medium} alt="eventImage" />
                        <figcaption>
                            <h1>Godkend ordre</h1>
                            <hr />
                            <div>
                                <h4>PRODUKTER:</h4>
                                <h6>FORESTILLING: <span>{event.title}</span></h6>
                                <h6>SCENE: <span>{event.stage_name}</span></h6>
                                <h6>DATO: <span>{StartDate()} KL: {event.starttime}</span></h6>
                            </div>
                        </figcaption>
                    </figure>
                </>
            ) : (<>..Loading</>)}
        </article>
    )
}
