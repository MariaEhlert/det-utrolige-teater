import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader, useAuth } from "../Helpers/Auth/Auth";
import UserCommentIcon from '../../Assets/Image/Usercomments-icon.png'
import DeleteIcon from '../../Assets/Image/Delete-icon.png'
import EditIcon from '../../Assets/Image/Edit-icon.png'
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const UserCommentList = () => {
    // const {id} = useParams();
    const [userCommentList, setUserCommentList] = useState([]);
    const { loginData } = useAuth()
    useEffect(() => {
        const getCommentData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/reviews`, { headers: authHeader() });
                if (result.data) {
                    setUserCommentList(result.data.items);
                }

            } catch (error) {
                console.log(error);
            }
        }
        getCommentData();
    }, [loginData.user_id])
    const deleteComment = async (id) => {
        try {
            // bruger authHeader til at tjekke om sessionStorage eksisterer
            const result = await axios.delete(`https://api.mediehuset.net/detutroligeteater/reviews/${id}`, { headers: authHeader() });
            if (result) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <article className="farvoriteTable">
            <div className="farvoriteHead">
                <img src={UserCommentIcon} alt="usercomment-icon" />
                <h3>MINE ANMELDELSER</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>FORESTILLINGER</th>
                        <th>EMNE</th>
                        <th>ANTAL STJERNER</th>
                        <th className="thEnd">REDIGER</th>
                    </tr>
                </thead>
                <tbody>
                    {userCommentList.filter(user => user.user_id == loginData.user_id).map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.event_title}, {item.stage_name}</td>
                                <td>{item.comment}</td>
                                <td>{item.num_stars}</td>
                                <td className="imageTd">
                                    <Link to={`/admin/${item.id}`}><img src={EditIcon} alt="edit-icon" /></Link>
                                    <img onClick={() => deleteComment(item.id)} src={DeleteIcon} alt="delete-icon" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </article>
    )
}