import './Navigation.css';
import ButtonRemove from '../button/Button[remove].jsx';
import logoMedium from '../../assets/logo-medium.png';
import {Link, useNavigate} from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();

    return (
        <nav className="main-navigation outer-content-container">
            <div className="inner-nav-container">
                {/*<ButtonRemove type="button" variant="invisible" onClick={() => navigate('/')}>
                    <img src={logoMedium} alt="Logo that links to home page"/>
                </ButtonRemove>*/}
                <ul className="main-navigation-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/posts">Portfolio</Link></li>
                    <li><Link to="/new">Inloggen</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;