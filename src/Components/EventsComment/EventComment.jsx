import axios from 'axios';
import { useEffect, useState } from 'react';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import style from './EventComment.module.scss';
import CommentIcon from '../../Assets/Image/Comment-icon.png';
import { useAuth } from '../Helpers/Auth/Auth';
import { CommentLogin } from './CommentLogin';
import { CommentPost } from './CommentPost';



export const EventComment = () => {
    const { loginData } = useAuth();
    const { event_id } = useParams();
    const [eventComment, setEventComment] = useState([]);
    useEffect(() => {
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
                        const created = Moment(comment.created).format('DD.MM.YYYY')
                        return (
                            <article className={style.comments} key={comment.id}>
                                <span>Antal stjerner: {comment.num_stars}</span>
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
                {!loginData ? (
                    <>
                        <article className={style.loginInfo}>
                            <img src={CommentIcon} alt='comment-icon' />
                            <div>
                                <p>Skriv en anmeldelse</p>
                                <p>Du skal være logget ind for at skrive en anmeldelse</p>
                            </div>
                        </article>
                        {/* <CommentLogin /> */}
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
                            <CommentPost event_id={event_id}/>
                        </>
                    )
                }

            </section>
        </>
    )
}

