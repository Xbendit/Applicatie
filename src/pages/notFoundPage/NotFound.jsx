import './NotFound.css';
import {useNavigate} from 'react-router-dom';
import ButtonRemove from '../../components/button/Button[remove].jsx';

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="not-found-section outer-content-container">
            <div className="inner-content-container">
                <h1>404</h1>
                <h2>De pagina waar je naar zoekt bestaat niet</h2>
                <span>
                    <ButtonRemove type="button" variant="primary" onClick={() => navigate('/')}>Terug naar home</ButtonRemove>
                </span>
            </div>
        </section>
    );
}

export default NotFound;