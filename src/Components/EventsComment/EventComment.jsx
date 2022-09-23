import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import style from './EventComment.module.scss';
import CommentIcon from '../../Assets/Image/Comment-icon.png';
import { useAuth } from '../Helpers/Auth/Auth';
import { CommentLogin } from './CommentLogin';
import { CommentPost } from './CommentPost';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";



export const EventComment = () => {
    const { loginData } = useAuth();
    const { event_id } = useParams();
    const [eventComment, setEventComment] = useState([]);
    useEffect(() => {
        //henter event anmeldelser
        const getEventComment = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/reviews?event_id=${event_id}`);
                if (result.data) {
                    setEventComment(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEventComment();
    }, [event_id])
    
    return (
        <>
            <section className={style.commentWrapper}>
                <article>

                    <h3>ANMELDELSER</h3>
                    <hr />
                    {eventComment && eventComment.map(comment => {
                         //Moment er en npm pakke
                        // gør at datoen kommer ud som dag, månede og år
                        const created = Moment(comment.created).format('DD.MM.YYYY')
                        return (
                            <article className={style.comments} key={comment.id}>
                                <Rating num_stars={comment.num_stars}/>
                                <p>{created}</p>
                                <h6>{comment.user.firstname} {comment.user.lastname}</h6>
                                <p>{comment.comment}</p>
                                <hr />
                            </article>
                        )
                    })}
                </article>
            </section>
            <section className={style.postComment}>
                {/* conditional ternary operator */}
                {/* hvis ikke bruger er logget ind vises login form eller vises anmeldelse form */}
                {!loginData ? (
                    <>
                        <article className={style.loginInfo}>
                            <img src={CommentIcon} alt='comment-icon' />
                            <div>
                                <p>Skriv en anmeldelse</p>
                                <p>Du skal være logget ind for at skrive en anmeldelse</p>
                            </div>
                        </article>
                        <CommentLogin />
                    </>
                ) :
                    (
                        <>
                            <article className={style.loginInfo}>
                                <img src={CommentIcon} alt='comment-icon' />
                                <div>
                                    <p>Skriv en anmeldelse</p>
                                </div>
                            </article>
                            {/* sender evenet_id med som props */}
                            <CommentPost event_id={event_id}/>
                        </>
                    )
                }

            </section>
        </>
    )
}
const Rating = (props) => {
    const totalStars = 5;
    const activeStars = (props.num_stars);
    return(
        <>
        {[...new Array(totalStars)].map((item, index) => {
            return (
                index < activeStars ? <AiFillStar key={index}/> : <AiOutlineStar key={index}/>
            ) 
        })}
        </>
    )
}

