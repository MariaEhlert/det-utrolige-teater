import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authHeader, useAuth } from "./Auth";
// import { authHeader, useAuth } from "./Auth";

const FavoriteContext = createContext()
//destructuring assignment ({children})
//({children}) er et shotcut for props.children
const FavoriteProvider = ({children}) => {
	const { loginData } = useAuth()
	const [ favorites, setFavorites ] = useState([])

	useEffect(() => {
		const getFavorites = async () => {
			try {
				if(loginData) {
					const result = await axios.get('https://api.mediehuset.net/detutroligeteater/favorites', { headers: authHeader() });
					if(result.data.items) {
						setFavorites(result.data.items)
					}
				}
			} catch(err) {
				console.log(`Fejl i Favorite Provider: ${err}`);
			}
		}
		getFavorites()
        //dependency arrays
        //render hvis der sker ændring i children, loginData eller loginData.access_token
	}, [children, loginData, loginData.access_token])

	return (
        //Provider er en metode til at give alle children adgang til favorites (useState hook)
		<FavoriteContext.Provider value={{favorites, setFavorites}}>
			{children}
		</FavoriteContext.Provider>
	);
}
//custom hooks
//gør det nemmer at hente rundt omkring
const useFavorites = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorites };