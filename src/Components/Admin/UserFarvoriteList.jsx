import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader } from "../Helpers/Auth/Auth";
import FavoriteIcon from '../../Assets/Image/Favorite-icon.png'
import DeleteIcon from '../../Assets/Image/Delete-icon.png'

export const UserFavoriteList = () => {
    const [farvoritesList, setFarvoritesList] = useState([]);
    useEffect(() => {
        const getFarvoriteData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/favorites', { headers: authHeader() });
                if (result.data) {
                    setFarvoritesList(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getFarvoriteData();
    }, [])
    return (
        <article className="farvoriteTable">
            <div className="farvoriteHead">
                <img src={FavoriteIcon} alt="favorite-icon" />
                <h3>MINE FAVORITTER</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>FORESTILLINGER</th>
                        <th className="thEnd">REDIGER</th>
                    </tr>
                </thead>
                <tbody>
                    {farvoritesList && farvoritesList.map(item => {
                        const deleteFarvorite = async () => {
                            await axios.delete(`https://api.mediehuset.net/detutroligeteater/favorites/${item.event_id}`, { headers: authHeader() })
                            window.location.reload(false);
                        }
                        return (
                            <tr key={item.event_id}>
                                <td><p>{item.title}, {item.stage_name}</p></td>
                                <td className="imageTd"><img onClick={() => deleteFarvorite()} src={DeleteIcon} alt="delete-icon" /> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </article>
    )
}
