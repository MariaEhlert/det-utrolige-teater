import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react"
import { SearchContext } from "../Helpers/Auth/SearchAuth"
import { EventItem } from "../Events/EventItem";
import { useParams } from "react-router-dom";

export const SearchResult = () => {
    const {event_id} = useParams();
    const { searchData } = useContext(SearchContext);
    const [ searchResult, setSearchResult ] = useState([]);
    useEffect(() => {
        const getSearchData = async () => {
            try{
                //if rundt om for ikke at få en fejl hvis man opdater 
                if(searchData){
                    const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/search/${searchData}`);
                    if(result.data){
                        setSearchResult(result.data.items);
                    }
                }
            }catch(error) {
                console.log(error);
            }
        }
        getSearchData();
    }, [searchData])
    return(
        <section className="eventListWrapper">
        {searchResult && searchResult.map(events => {
            return(
                // <HomesListItem key={homes.id} data={homes} />
                <EventItem key={events.id} data={events} event_id={event_id}/>

                )
        })}
        </section>
        
    )
}