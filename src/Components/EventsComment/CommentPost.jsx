import axios from "axios";
import { useForm } from "react-hook-form";
import { authHeader } from "../Helpers/Auth/Auth";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import style from './CommentPost.module.scss';
import { useState } from "react";

export const CommentPost = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);
        formData.append('num_stars', data.num_stars);
        formData.append('event_id', props.event_id);
        formData.append('active', 1);
        // bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.post('https://api.mediehuset.net/detutroligeteater/reviews', formData, { headers: authHeader() });
        if (result) {
            window.location.reload(false);

        } else {
            console.log(errors);
        }
    }
    // er null så den er tøm hvis der ikke er blevet gemt en rating
    const [rating, setRating] = useState(null);
    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.ratingElement}>
                    <h6>Antal stjerner: </h6>
                    <div className={style.ratingInput}>
                        {/* laver et array med 5 objekter i som */}
                        {/* fill()-metoden ændrer alle elementer i et array til en statisk værdi, fra et startindeks (standard 0) 
                            til et slutindeks (standard array.length). Det returnerer det ændrede array. */}
                        {Array(5).fill().map((star, i) => {
                            // starter på 1 i stedet for 0 i array'et
                            const ratingValue = i + 1
                            return (
                                <label key={i}>
                                    <input type='radio' onClick={() => setRating(ratingValue)} value={ratingValue} {...register('num_stars', { required: true, min: 1, max: 5 })}></input>
                                    {/* hvis ratingValue er mindre end eller lig rating skal den vise fyldte stjerner eller skal den vise tømme*/}
                                    {ratingValue <= rating ? (<AiFillStar className={style.numStar} />) : (<AiOutlineStar className={style.numStar} />)}
                                </label>
                            )
                        })}
                    </div>
                </div>
                    {errors.num_stars && (
                        <p>Giv antal stjerner fra 1 til 5</p>
                    )}
                <div className={style.formElement}>
                    <div>
                        <input type="text" id="subject" placeholder="Emne"{...register('subject', { required: true })} />
                    </div>
                        {errors.subject && (
                            <p>Skriv et emne</p>
                        )}
                </div>
                <div className={style.formElement}>
                    <textarea id="comment" placeholder="Kommentar" {...register('comment', { required: true })}></textarea>
                    <button>SEND</button>
                    {errors.comment && (
                        <p>Skriv en kommentar</p>
                    )}
                </div>
            </form>
        </section>

    )
}