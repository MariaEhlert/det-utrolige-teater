import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader } from "../Helpers/Auth/Auth";
import TicketIcon from '../../Assets/Image/Ticket-icon.png'
import DeleteIcon from '../../Assets/Image/Delete-icon.png'

export const UserReservationList = () => {
    const [reservationList, setReservationList] = useState([]);
    useEffect(() => {
        const getReservationList = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/reservations', { headers: authHeader() });
                if (result.data) {
                    setReservationList(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getReservationList();
    }, [])
    return (
        <article className="farvoriteTable">
            <div className="farvoriteHead">
                <img src={TicketIcon} alt="favorite-icon" />
                <h3>MINE RESERVATIONER</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>DATO &#38; TID</th>
                        <th >FORESTILLINGER</th>
                        <th>SCENE</th>
                        <th>ANTAL</th>
                        <th>PRIS</th>
                        <th className="thEnd">REDIGER</th>
                    </tr>
                </thead>
                <tbody>
                    {reservationList && reservationList.map(item => {
                        const deleteFarvorite = async () => {
                            await axios.delete(`https://api.mediehuset.net/detutroligeteater/reservations/${item.id}`, { headers: authHeader() })
                            window.location.reload(false);
                        }
                        return (
                            <tr key={item.id}>
                                <td>DATO &#38; TID</td>
                                <td >{item.event_title}</td>
                                <td>SCENE</td>
                                <td>ANTAL</td>
                                <td>PRIS</td>
                                <td className="imageTd"><img onClick={() => deleteFarvorite()} src={DeleteIcon} alt="delete-icon" /> </td>
                            </tr>
                        )
                    })}                    
                </tbody>
            </table>
        </article>
    )
}
