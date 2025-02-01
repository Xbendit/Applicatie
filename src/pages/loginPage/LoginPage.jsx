import './LoginPage.css';
import React, {useContext,useState} from 'react';
import calculateReadTimeRemove from '../../helpers/calculateReadTime[Remove].js';
import {Link, useNavigate} from 'react-router-dom';
import InputRemove from '../../components/input/Input[remove].jsx';
import ButtonRemove from '../../components/button/Button[remove].jsx';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../../context/AuthContext.jsx";


/*/!*naam app voor database: cryptoapp*!/
'X-Api-Key':cryptoapp:0EGScyLvFHmmJFd0N4qG */

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Inlog gegevens:", { password, username });

        try {
            const response = await axios.post('https://api.datavortex.nl/cryptoapp/users/authenticate',
                {
                    password,
                    username,
                    authorities: [
                        {
                            authority: "USER"
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            );
            console.log(response)
            console.log("Gebruiker succesvol ingelogt")


            login(response.data.jwt)


            // Let op: omdat we geen axios Canceltoken gebruiken zul je hier een memory-leak melding krijgen.
            // Om te zien hoe je een canceltoken implementeerd kun je de bonus-branch bekijken!

            // als alles goed gegaan is, linken we dyoor naar de login-pagina
            navigate('/portfolio');
        } catch(e) {
            console.error("er ging iets mis", e);
        }
    }

    return (
        <section className="new-post-section outer-content-container">
            <div className="inner-content-container__text-restriction">
                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Registreren
                    </button>

                </form>
            </div>
        </section>
    );
}

export default LoginPage;