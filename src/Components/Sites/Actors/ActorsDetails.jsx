import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from './ActorsDetails.module.scss';

export const ActorsDetails = () => {
    const { actor_id } = useParams();
    const [actorDetails, setActorDetails] = useState();
    useEffect(() => {
        // henter skuespiller ud fra id
        const getActorDetails = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/actors/${actor_id}`);
                if (result.data) {
                    setActorDetails(result.data.item);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getActorDetails();
    }, [actor_id])
    return (
        <section className={style.actorDetailsWrapper}>
            {actorDetails && actorDetails ? (
                <article>
                    <h1>Skuespillere</h1>
                    <figure>
                        <img src={actorDetails.image} alt={actorDetails.name} />
                        <figcaption>
                            <h3>{actorDetails.name}</h3>
                            <p>{actorDetails.description}</p>
                        </figcaption>
                    </figure>
                </article>
            ) : (<>...Loading</>)}
            <div>
                <Link to={'/actors'}><button>ALLE SKUESPILLERE</button></Link>
            </div>
        </section>
    )
}