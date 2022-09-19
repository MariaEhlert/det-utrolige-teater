import { NavLink } from 'react-router-dom'
import { useAuth } from '../Helpers/Auth/Auth';

export const Nav = () => {
    const { loginData } = useAuth();
	return (
		<nav>
			<ul className='topNav'>
				<li><NavLink to='/'>FORSIDE</NavLink></li>
				<li><NavLink to='/events'>FORESTILLINGER &#38; EVENTS</NavLink></li>
				<li><NavLink to='/actors'>SKUESPILLERE</NavLink></li>
				<li><NavLink to='/login'>{loginData ? ('MIN SIDE') : ('LOGIN')}</NavLink></li>
			</ul>
		</nav>
	)
}