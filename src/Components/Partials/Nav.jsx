import { NavLink } from 'react-router-dom'

export const Nav = () => {
	return (
		<nav>
			<ul className='topNav'>
				<li><NavLink to='/'>FORSIDE</NavLink></li>
				<li><NavLink to='/events'>FORESTILLINGER &#38; EVENTS</NavLink></li>
				<li><NavLink to='/actors'>SKUESPILLERE</NavLink></li>
				<li><NavLink to='/login'>LOGIN</NavLink></li>
			</ul>
		</nav>
	)
}