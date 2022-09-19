import { createContext } from "react";
import { useState } from 'react';
//useContext til at transpoter igennem komponeter 
const SearchContext = createContext()
//({children}) er et shotcut for props.children
const SearchProvider = ({children}) => {

const [searchData, setSearchData] = useState('');

return (
    //Provider er en metode til at give alle children adgang til searcData (useState hook)
    <SearchContext.Provider value={{searchData, setSearchData}}>
        {children}
    </SearchContext.Provider>
)}

export { SearchContext, SearchProvider }