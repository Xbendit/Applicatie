import './Navigation.css';
import ButtonRemove from '../button/Button[remove].jsx';
import logoMedium from '../../assets/logo-medium.png';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

function Navigation() {
    const navigate = useNavigate();
    const {logout } = useContext(AuthContext);

    return (
        <nav className="main-navigation outer-content-container">
            <div className="inner-nav-container">
                {/*<ButtonRemove type="button" variant="invisible" onClick={() => navigate('/')}>
                    <img src={logoMedium} alt="Logo that links to home page"/>
                </ButtonRemove>*/}
                <ul className="main-navigation-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/login">Inloggen</Link></li>
                    <li><Link to="/register">Registreren</Link></li>
                </ul>
                <button className="login" onClick={logout} >Uitloggen</button>
            </div>
        </nav>
    );
}

export default Navigation;