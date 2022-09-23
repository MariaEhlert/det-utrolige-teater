import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Helpers/Auth/Auth";
import './BurgerMenu.scss'

export const BurgerMenu = () => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }
    const { loginData } = useAuth();
    return(
        <>
            {/* conditional ternary operator */}
            {/* hvis isActive er sat for div'en klasse navnet 'burgerMenuActive' ellers for den klasse navnet 'burgerMenu' */}
            <div className={isActive ? 'burgerMenuActive' : 'burgerMenu'} onClick={handleToggle}>
                <div className="burgerMenuLine"></div>
                <div className="burgerMenuLine"></div>
                <div className="burgerMenuLine"></div>
            </div>
            <ul className={isActive ? 'activeMenu' : 'menu'}>
                <li><NavLink className="navigationLinks" to='/' onClick={handleToggle}>FORSIDE</NavLink></li>
                <li><NavLink className="navigationLinks" to='/events' onClick={handleToggle}>FORESTILLINGER &#38; EVENTS</NavLink></li>
                <li><NavLink className="navigationLinks" to='/actors' onClick={handleToggle}>SKUESPILLERE</NavLink></li>
                {/* conditional ternary operator */}
				{/* hvis loginData er sat vises MIN SIDE i nav eller vises LOGIN */}
                <li><NavLink className="navigationLinks" to='/admin' onClick={handleToggle}>{loginData ? ('MIN SIDE') : ('LOGIN')}</NavLink></li>
            </ul>
        </>
    )
}