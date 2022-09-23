import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../Helpers/Auth/Auth';
import './Nav.scss'

export const Nav = () => {
	const { loginData } = useAuth();
	return (
		<nav>
			<ul className='topnav'>
				<li><NavLink to='/'>FORSIDE</NavLink></li>
				<li><NavLink to='/events'>FORESTILLINGER &#38; EVENTS</NavLink></li>
				<li><NavLink to='/actors'>SKUESPILLERE</NavLink></li>
				<li><NavLink to='/admin'>{loginData ? ('MIN SIDE') : ('LOGIN')}</NavLink></li>
			</ul>
		</nav>

	)
}