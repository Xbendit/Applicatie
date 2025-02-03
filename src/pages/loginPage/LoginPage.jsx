import './LoginPage.css';
import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext.jsx";
import '../../components/button/ButtonSort.jsx'
import ButtonSort from "../../components/button/ButtonSort.jsx";


/*/!*naam app voor database: cryptoapp*!/
'X-Api-Key':cryptoapp:0EGScyLvFHmmJFd0N4qG */

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Inlog gegevens:", {password, username});

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
                        'X-Api-Key': 'cryptoapp:0EGScyLvFHmmJFd0N4qG'
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
        } catch (e) {
            console.error("er ging iets mis", e);
        }
    }

    return (
        <section className="login-section">

            <div className="login-inner">

                <header>Login</header>

                <form onSubmit={handleSubmit}>

                    <div className='input-login'>

                        <div className='text'>Username:</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className='text'>Password:</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='button-login'>
                        <ButtonSort
                            onClick="submit"
                            className='loginbutton'

                        >
                            Login
                        </ButtonSort>
                    </div>

                </form>
            </div>
        </section>
    );
}

export default LoginPage;