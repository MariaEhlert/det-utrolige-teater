import { useState } from "react";
import { NavLink } from "react-router-dom";
import './BurgerMenu.scss'

export const BurgerMenu = () => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }
    return(
        <>
            <div className={isActive ? 'burgerMenuActive' : 'burgerMenu'} onClick={handleToggle}>
                <div className="burgerMenuLine"></div>
                <div className="burgerMenuLine"></div>
                <div className="burgerMenuLine"></div>
            </div>
            <ul className={isActive ? 'activeMenu' : 'menu'}>
                <li><NavLink className="navigationLinks" to='/home' onClick={handleToggle}>FORSIDE</NavLink></li>
                <li><NavLink className="navigationLinks" to='/events' onClick={handleToggle}>FORESTILLINGER &#38; EVENTS</NavLink></li>
                <li><NavLink className="navigationLinks" to='/actors' onClick={handleToggle}>SKUESPILLERE</NavLink></li>
                <li><NavLink className="navigationLinks" to='/admin' onClick={handleToggle}>LOGIN</NavLink></li>
            </ul>
        </>
    )
}