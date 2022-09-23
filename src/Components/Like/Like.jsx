import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { authHeader, useAuth } from "../Helpers/Auth/Auth";
import { useFavorites } from "../Helpers/Auth/FavoriteAuth";
export const Like = ({ event_id }) => {
    const { loginData } = useAuth();
    const { favorites } = useFavorites();
    // isFavorite er sat til false så hvis den er 'tom' er liket også tom
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        if (favorites.length) {
            // Setter bool efter om produkt ligger i listen over favoritter
            setIsFavorite(() =>
                favorites.some(item => item.event_id === event_id)
            )
        }
    }, [favorites, event_id])
    const toggleFavorite = async () => {
        // onClick funktion til hvis isFavorite er sat så sletter din liket fra api'et (dislike)
        if (isFavorite) {
            await axios.delete(`https://api.mediehuset.net/detutroligeteater/favorites/${event_id}`, { headers: authHeader() })
            // isFavorite bliver false ('tom' hjerte)
            setIsFavorite(false);
        } else {
            //onClick funktion til hvis ikke isFavorite er sat bliver det post'et til api'et (like) 
            const formData = new FormData()
            formData.append("event_id", event_id)
            await axios.post('https://api.mediehuset.net/detutroligeteater/favorites', formData, { headers: authHeader() })
            // isFavorite bliver true ('fyldt' hjerte)
            setIsFavorite(true)
        }
    }
    return (
        <>
            {loginData ? (

                <button onClick={toggleFavorite}>
                    {/* conditional ternary operator */}
                    {/* hvis isFavorie er sat vises 'tom' hjerte react icon eller vises 'fyldt' hjerte react icon */}
                    {isFavorite ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                </button>
            ) : null}
        </>
    )
}