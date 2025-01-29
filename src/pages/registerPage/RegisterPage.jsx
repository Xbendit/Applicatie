import './RegisterPage.css';
import React, {useState} from 'react';

import calculateReadTimeRemove from '../../helpers/calculateReadTime[Remove].js';
import {useNavigate} from 'react-router-dom';
import InputRemove from '../../components/input/Input[remove].jsx';
import ButtonRemove from '../../components/button/Button[remove].jsx';
import axios from 'axios';


/*/!*naam app voor database: cryptoapp*!/
'X-Api-Key':cryptoapp:0EGScyLvFHmmJFd0N4qG */

/*email
    :
    "vanrossumben@gmail.com"
password
    :
    "12345678"
username
    :
    "benno"*/

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Registratiegegevens:", { email, password, username });

        try {
            await axios.post('https://api.datavortex.nl/cryptoapp/users',
                {
                    email,
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
                        'X-Api-Key': 'cryptoapp:'
                    }
                }
            );

            console.log("Gebruiker succesvol geregistreerd")
            // Let op: omdat we geen axios Canceltoken gebruiken zul je hier een memory-leak melding krijgen.
            // Om te zien hoe je een canceltoken implementeerd kun je de bonus-branch bekijken!

            // als alles goed gegaan is, linken we dyoor naar de login-pagina
            navigate('/login');
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
                    placeholder="Emailadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

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

export default RegisterPage;