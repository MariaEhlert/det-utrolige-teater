import { useForm } from "react-hook-form";
import { useAuth } from "../../Helpers/Auth/Auth";
import { myFetch } from "../../Helpers/Auth/Fetch";
import { Layout } from "../../Helpers/Layout/Layout";
import { MySite } from "../../Admin/MySite";
import style from './Login.module.scss';

export const Login = () => {
    //register og handleSubmit kommer fra useForm
    const { register, handleSubmit, formState: { errors } } = useForm();
    // kalder custum state hooks useAuth
    const { loginData, setLoginData } = useAuth();
    const sendLoginRequest = async data => {
        // sætter formData til at være det samme som new FormData
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        //deklarerer option objekt
        const options = {
            method: 'POST',
            body: formData
        }
        //fecth'er api endponit med url og options
        const result = await myFetch('https://api.mediehuset.net/token', options);
        handleSessionData(result);
    }
    const handleSessionData = data => {
        if (data) {
            // sætter token i sessionStorage
            sessionStorage.setItem('token', JSON.stringify(data))
            setLoginData(data);
        }

    }
    const logOut = () => {
        //fjerner token i sessionStorage
        sessionStorage.removeItem('token');
        setLoginData('');
    }
    return (
        <Layout title='Login' description='Login'>
            <section className={style.loginWrapper}>
                {/* bruger en conditional ternary operator til*/}
                {/* hvis ikke bruger er logget ind vises login formen */}
                {!loginData && !loginData.username ? (
                    <article>
                        <h4>Indtast dit brugernavn og adgangskode for at logge ind</h4>
                        {/* closer  */}
                        {/* en måde man sender en function videre */}
                        {/* sendLoginRequest lukker handleSubmit's funktion */}
                        <form onSubmit={handleSubmit(sendLoginRequest)}>
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
                            </div>
                            <div className={style.btnWrapper}>
                                <button className={style.submitBtn}>Login</button>
                                <button type="reset">Annuller</button>
                            </div>
                        </form>
                    </article>
                ) :
                    (
                        // hvis bruger er logget ind vises alle brugers kommentar 
                        // og en meddelese med bruger navn og en logud knap
                        <section className={style.loggedInWrapper}>
                            <div className={style.logOutWrapper}>
                                <p>Du er logget ind som {loginData.username}</p>
                                <div className={style.logoutBtn}>
                                    <button onClick={logOut}>Log ud</button>
                                </div>
                            </div>
                            <MySite/>
                        </section>
                    )
                }
            </section>
        </Layout>
    )
}