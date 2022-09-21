import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authHeader } from "../Helpers/Auth/Auth";
import style from './EditUserCommet.module.scss';

export const EditUserComment = () => {
    const {comment_id} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const formData = new URLSearchParams();
        // const formData = new FormData();
        formData.append('id', comment_id);
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);
        formData.append('num_stars', data.num_stars);
        formData.append('active', 1);
        // bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.put('https://api.mediehuset.net/detutroligeteater/reviews', formData, { headers: authHeader() });
        if (result) {
            alert('Din kommentar er opdateret')
            navigate('/admin', { replace: true })

        } else {
            console.log(errors);
        }
    }
    return (
        <section>
            <article className={style.editFormWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Skriv en anmeldelse</h2>
                    <div className={style.formElement}>
                        <div className={style.formInput}>
                            <label>Emne</label>
                            <input type="text" id="subject" placeholder="Opdater emne"{...register('subject', { required: true })} />
                        </div>
                        <span>
                            {errors.subject && (
                                <p>Skriv i emne</p>
                            )}
                        </span>
                    </div>
                    <div className={style.formElement}>
                        <div className={style.formInput}>
                            <label>Anmeldelse</label>
                            <textarea id="comment" placeholder="Opdater anmeldese" {...register('comment', { required: true })}></textarea>
                        </div>
                        <span>
                            {errors.comment && (
                                <p>Skrive i anmeldelse</p>
                            )}
                        </span>
                    </div>
                    <div className={style.formElement}>
                        <div className={style.formInput}>
                            <label>Antal stjerner</label>
                            <input type='number' id="num_stars" placeholder="Opdater stjerner fra 1 til 5" {...register('num_stars', { required: true, min: 1, max: 5 })}></input>
                        </div>
                        <span>
                            {errors.num_stars && (
                                <p>Giv antal stjerner fra 1 til 5</p>
                            )}
                        </span>
                    </div>
                    <div className={style.btnWrapper}>
                        <button>Send kommentar</button>
                        <button type='reset'>Nulstil</button>
                    </div>
                </form>
            </article>
        </section>

    )
}