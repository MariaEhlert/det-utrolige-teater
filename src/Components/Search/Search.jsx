import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Helpers/Auth/SearchAuth";
export const SearchBar = () => {
    // useNavigate er et hook som hjælper at gå til den specifikke URL.
    const navigate = useNavigate();
    // til at sætte data i setSearchData
    const { setSearchData } = useContext(SearchContext);
    const { register, handleSubmit } = useForm();

    const getSearchResult = (data) => {
        setSearchData(data.searchItem);
        // navigerer til de andre routere ved hjælp af push eller replace-metoderne
        navigate('/search', { replace: true });
    }
    return (
        <div className="searchWrapper">
            {/* closer  */}
            {/* en måde man sender en function videre */}
            {/* getSearchResult lukker handleSubmit's funktion */}
            <form onSubmit={handleSubmit(getSearchResult)}>
                <input
                    id="searchItem"
                    type="text"
                    {...register("searchItem", { required: true })}
                    placeholder="Indtast søgeord"
                />
                <button><AiOutlineSearch /></button>
            </form>
        </div>
    )
}