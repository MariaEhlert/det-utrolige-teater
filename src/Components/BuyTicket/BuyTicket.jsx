import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../Helpers/Layout/Layout"
import Moment from "moment";


export const BuyTicket = () => {
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
    return (
        <Layout title='Køb billet' description='Køb billet'>
            <section>
                <h1>Køb billet</h1>
                <hr />
                {eventDetails && eventDetails ? (
                    <>
                        <img src={eventDetails.image_medium} alt={eventDetails.id} />
                        <h4>{eventDetails.title}</h4>
                        <h3>{StartDate()} KL. {eventDetails.starttime}</h3>
                        <h4 >BILLETPRIS: {new Intl.NumberFormat("da").format(eventDetails.price)} DKK</h4>
                        <p>PRIS INKL. MOMS</p>
                        <form>
                            <div>
                                <label>FORNAVN</label>
                                <input type="text" id="" />
                            </div>
                            <div>
                                <label>EFTERNAVN</label>
                                <input type="text" id="" />
                            </div>
                            <div>
                                <label>VEJNAVN &#38; BY</label>
                                <input type="text" id="" />
                                <input type="number" id="" />
                            </div>
                            <div>
                                <label>POSTNR. &#38; BY</label>
                                <input type="number" id="" />
                                <input type="text" id="" />
                            </div>
                        </form>
                    </>
                ) : (<>...Loading</>)
                }
            </section>
        </Layout>
    )
}