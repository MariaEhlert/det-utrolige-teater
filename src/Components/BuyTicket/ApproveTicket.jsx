import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader } from "../Helpers/Auth/Auth";
import Moment from "moment";
import { Link } from "react-router-dom";

export const ApproveTicket = () => {
    const [approveTicket, setApproveTicket] = useState([]);
    const [ticketNumber, setTicketNumber] = useState();
    useEffect(() => {
        const ticketNumber = JSON.parse(localStorage.getItem('ticket-id'));
        if (ticketNumber) {
            setTicketNumber(ticketNumber);
        }
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
    // console.log(ticketNumber);

    return (
        <>
            <h1>Godkend ordre</h1>
            <EventData />

            <h4>KUNDE:</h4>
            {approveTicket.filter(user => user.id == ticketNumber).map(item => {
                // console.log(item);
                return (
                    <article key={item.id}>
                        <p>{item.firstname} {item.lastname}</p>
                        <p>{item.address}</p>
                        <p>{item.zipcode} {item.city}</p>
                        <p>EMAIL: {item.email}</p>
                        <h3>BILLETTERNE SENDES ELEKTRONISK TIL DIN MAIL</h3>
                    </article>
                )
            })}
            {/* <button onClick={() => deleteFarvorite()}>TILBAGE</button> */}
            <Link><button>GODKEND BESTILLING</button></Link>
        </>
    )
}
const EventData = () => {
    // henter event data fra localStorage
    const [event, setEvent] = useState([]);
    useEffect(() => {
        const eventData = JSON.parse(localStorage.getItem('event'));
        if (eventData) {
            setEvent(eventData);
        }
    }, []);
    const StartDate = () => {
        const startDate = Moment(event.startdate).format('DD-MM-YYYY')
        return startDate
    }
    return (
        <>
            <h4>PRODUKTER:</h4>
            {event && event ? (
                <>
                    <img src={event.image_medium} alt="eventImage" />
                    <h6>FORESTILLING: <span>{event.title}</span></h6>
                    <h6>SCENE: <span>{event.stage_name}</span></h6>
                    <h6>DATO: <span>{StartDate()} KL: {event.starttime}</span></h6>
                </>
            ) : (<>..Loading</>)}
        </>
    )
}
