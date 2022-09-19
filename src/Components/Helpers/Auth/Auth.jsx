import { createContext, useContext, useEffect, useState } from "react";
//useContext er en måde at styre tilstande globalt (fx sideskrift)
//useContext til at transpoter igennem komponeter 
//så man fx kan fortælle bruger "du er logget ind som {loginData.username}"
const AuthContext = createContext();

//({children}) er et shotcut for props.children
//da det kun er props children der skal bruges og
//der er ingen properties fx props.title 
const AuthProvider = ({children}) => {
    const [loginData, setLoginData] = useState('');
    useEffect(() => {
        if(sessionStorage.getItem('token')){
            setLoginData(JSON.parse(sessionStorage.getItem('token')))
        };
        //dependency arrays
    }, [children]);
    return(
        //Provider er en metode til at give alle children adgang til loginData (useState hook)
        //alt der ligger i AuthContext giver adgang til loginData, setLoginData
        //alt der ligger i appen har adgang til useState hook (loginData)
        //vi bruger den til at 
        <AuthContext.Provider value={{loginData, setLoginData}}>
            {children}
        </AuthContext.Provider>
    )
};
//custom hooks
//gør det nemmer at hente rundt omkring
const useAuth = () => useContext(AuthContext);
//hvis man skal kalde context 
//eksempel: const {loginData} = useAuth()

const authHeader = () => {
    //henter sessionStorage hvis den eksisterer
    //conditional ternary operator
    const currentToken = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : "";
    // returner token hvis den eksister
    if (currentToken) {
      return {
        //* er en asterisk
        //gør at alle api og domæner kan tilgå det (undgå korsfejl)
        //skal stå i gåseøjne fordi der er bindestreg ellers minuser den
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${currentToken.access_token}`,
      };
      // ellers returner den ikke noget
    } else {
      return {};
    }
  }

export { AuthContext, AuthProvider, useAuth, authHeader}