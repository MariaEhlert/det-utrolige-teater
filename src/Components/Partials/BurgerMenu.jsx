import { useState } from "react";
import { Link } from "react-router-dom";
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
                <li><Link className="navigationLinks" to='/' onClick={handleToggle}>Forside</Link></li>
            </ul>
        </>
    )
}