import { Nav } from "./Nav"
import logo from '../../Assets/Image/Logo.png';
import { SearchBar } from "../Search/Search";
import './Header.scss';
import { BurgerMenu } from "./BurgerMenu";

export const Header = () => {
	return (
		<header>
			<SearchBar />
			<div className="logoWrapper">
				<img src={logo} alt="logo" />
			</div>
			<Nav />
			<BurgerMenu />
		</header>
	)
}