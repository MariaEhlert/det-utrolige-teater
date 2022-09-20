import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ActorsDetails = () => {
    const { actor_id } = useParams();
    const [actorDetails, setActorDetails] = useState();
    useEffect(() => {
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
    return(
        <></>
    )
}