import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../Helpers/Auth/Auth";
import style from './EventComment.module.scss';

export const CommentLogin = () => {
    //register og handleSubmit kommer fra useForm
    const { register, handleSubmit, formState: { errors } } = useForm();
    // kalder custum state hooks useAuth
    const { setLoginData } = useAuth();
    const sendLoginRequest = async data => {
        // sætter formData til at være det samme som new FormData
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        const result = await axios.post('https://api.mediehuset.net/token', formData);
        handleSessionData(result.data);
    }
    const handleSessionData = data => {
        if (data) {
            // sætter token i sessionStorage
            sessionStorage.setItem('token', JSON.stringify(data))
            setLoginData(data);
        }

    }
    return (
        <form onSubmit={handleSubmit(sendLoginRequest)} className={style.loginWrapper}>
            <div>
                <input type="text" placeholder="Brugernavn" id="username" {...register("username", { required: true })} />
                {/* && hvis er der fejl så skal den sende en fejl besked */}
                {errors.username && (
                    <p>Du skal indtaste dit brugernavn</p>
                )}
            </div>
            <div>
                <input type="password" placeholder="Adgangskode" id="password" {...register("password", { required: true })} />
                {/* && hvis er der fejl så skal den sende en fejl besked */}
                {errors.password && (
                    <p>Du skal indtaste din adgangskode</p>
                )}
                <button className={style.submitBtn}>Login</button>
            </div>
        </form>
    )
}