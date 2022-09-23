import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../../Helpers/Layout/Layout"
import style from './Actors.module.scss';

export const Actors = () => {
    const [actorsList, setActorsList] = useState([]);
    useEffect(() => {
        // henter alle skuespiller
        const getActorsList = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/actors');
                if (result.data) {
                    setActorsList(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getActorsList();
    }, [])
    return (
        <Layout title='Skuespillere' description='Skuespillere'>
            <section className={style.actorWrapper}>
                <h1>Skurespillere</h1>
                {actorsList && actorsList.map(actor => {
                    return (
                    <div key={actor.id}>
                        <article>
                            <figure>
                                <img src={actor.image} alt={actor.name} />
                                <figcaption>
                                    <h3>{actor.name}</h3>
                                    {/* udksriver kun bogstaver fra 0 til 229 */}
                                    <p>{actor.description.slice(0, 229)}...</p>
                                </figcaption>
                            </figure>
                            <Link to={`/actors/${actor.id}`}><button>LÆS MERE</button></Link>
                            
                        </article>
                        <hr />
                    </div>
                    )
                })}
            </section>
        </Layout>
    )
}