import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authHeader, useAuth } from "../Helpers/Auth/Auth";
import style from './PostReservation.module.scss';

export const PostReservation = (props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginData } = useAuth()
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('event_id', props.event_id);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('address', data.address);
        formData.append('zipcode', data.zipcode);
        formData.append('city', data.city);
        formData.append('email', data.email);
        formData.append('seats[]', 1);
        formData.append('active', 1);
        // bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.post('https://api.mediehuset.net/detutroligeteater/reservations', formData, { headers: authHeader() });
        if (result) {
            //ligger billet id'et i localStorage
            localStorage.setItem('ticket-id', (result.data.new_id));
            navigate('/buyticket/showticket', { replace: true })
        } else {
            console.log(errors);
        }
    }

    const [seats, setSeats] = useState();
    // const { register, formState: { errors } } = useForm();
    useEffect(() => {
        const getSeatsData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${props.event_id}`);
                if (result.data) {
                    setSeats(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getSeatsData();
    }, [props])
    return (
        loginData.access_token && (
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className={style.userFormWrapper}>
                    <div className={style.formElement}>
                        <label>FORNAVN</label>
                        <div className={style.inputWrapper}>
                            <input type="text" id="firstname" {...register('firstname', { required: true })} />
                        </div>
                    </div>
                    <div className={style.formElement}>
                        <label>EFTERNAVN</label>
                        <div className={style.inputWrapper}>
                            <input type="text" id="lastname" {...register('lastname', { required: true })} />
                        </div>
                    </div>
                    <div className={style.formElement}>
                        <label>VEJNAVN &#38; NR</label>
                        <div className={style.inputWrapper}>
                            <input type="text" id="address" {...register('address', { required: true })} />
                        </div>
                    </div>
                    <div className={style.formElement}>
                        <label>POSTNR. &#38; BY</label>
                        <div className={style.inputWrapper} id={style.zipcodeWrapper}>
                            <input type="number" id="zipcode" {...register('zipcode', { required: true })} />
                            <input type="text" id="city" {...register('city', { required: true })} />
                        </div>
                    </div>
                    <div className={style.formElement}>
                        <label>EMAIL</label>
                        <div className={style.inputWrapper}>
                            <input type="text" id="email" {...register('email', { required: true })} />
                        
                        </div>
                    </div>
                    {errors.firstname && errors.lastname && errors.address && errors.zipcode && errors.city && errors.email && (
                        <p>ALLE FELTER SKAL UDFYLDES</p>
                    )}
                </article>
                <article className={style.seatWrapper}>
                    <div className={style.headWrapper}>
                        <h4>FRSCENEN</h4>
                    </div>
                    <article>
                        {seats && seats.map(item => {
                            const handleToggle = id => {
                                // console.log(id);
                                return { ...item.id }
                            }
                            return (
                                <div key={item.id} >
                                    {item.is_reserved > 0 ? (
                                        <>
                                        <div className={style.checked}></div>
                                        </>
                                    ) : (
                                        <>
                                            <div  className={style.seat} onClick={() => handleToggle(item.id)}>
                                                {/* <input type="checkbox"  id={style.seat}{...register('seats[]', { required: true })} /> */}
                                            </div>
                                        </>
                                    )}
                                                
                                </div>
                            )
                        })}
                    </article>
                </article>
                <p className={style.seatText}>VÆLG SIDDEPLADSER</p>
                <div className={style.submitBtn}>
                    <button >GODKEND BESTILLING</button>
                </div>
            </form>
        )
    )
}
