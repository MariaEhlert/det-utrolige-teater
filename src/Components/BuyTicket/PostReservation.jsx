import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authHeader } from "../Helpers/Auth/Auth";

export const PostReservation = (props) => {
    const {ticket_id} = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('event_id', props.event_id);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('address', data.address);
        formData.append('zipcode', data.zipcode);
        formData.append('city', data.city);
        // bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.post('https://api.mediehuset.net/detutroligeteater/reservations', formData, { headers: authHeader() });
        if (result) {
            navigate('/buyticket/showticket', { replace: true })

        } else {
            console.log(errors);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>FORNAVN</label>
                <input type="text" id="firstname" {...register('firstname', { required: true })} />
                {errors.firstname && (
                    <p>Indtast fornavn</p>
                )}
            </div>
            <div>
                <label>EFTERNAVN</label>
                <input type="text" id="lastname" {...register('lastname', { required: true })} />
                {errors.lastname && (
                    <p>Indtast efternavn</p>
                )}
            </div>
            <div>
                <label>VEJNAVN &#38; NR</label>
                <input type="text" id="address" {...register('address', { required: true })} />
                {errors.address && (
                    <p>Indtast vejnavn &#38; nr</p>
                )}
            </div>
            <div>
                <label>POSTNR. &#38; BY</label>
                <input type="number" id="zipcode" {...register('zipcode', { required: true })} />
                <input type="text" id="city" {...register('city', { required: true })} />
                {errors.zipcode && (
                    <p>Indtast postnr</p>
                )}
                {errors.city && (
                    <p>Indtast by</p>
                )}
            </div>
            <button>Send kommentar</button>
            
        </form>
    )
} 