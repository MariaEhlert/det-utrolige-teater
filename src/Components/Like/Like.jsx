import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { authHeader, useAuth } from "../Helpers/Auth/Auth";
import { useFavorites } from "../Helpers/Auth/FavoriteAuth";
export const Like = ({ event_id }) => {
    const { loginData } = useAuth();
    const { favorites } = useFavorites();
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
        if (isFavorite) {
            await axios.delete(`https://api.mediehuset.net/detutroligeteater/favorites/${event_id}`, { headers: authHeader() })
            setIsFavorite(false);
        } else {
            const formData = new FormData()
            formData.append("event_id", event_id)
            await axios.post('https://api.mediehuset.net/detutroligeteater/favorites', formData, { headers: authHeader() })
            setIsFavorite(true)
        }
    }
    return (
        <>
            {loginData ? (

                <button onClick={toggleFavorite}>
                    {isFavorite ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                </button>
            ) : null}
        </>
    )
}