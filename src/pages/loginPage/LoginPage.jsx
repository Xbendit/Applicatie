import './LoginPage.css';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext.jsx";
import '../../components/button/ButtonSort.jsx'
import ButtonSort from "../../components/button/ButtonSort.jsx";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);


    async function handleSubmit(e) {
        e.preventDefault();

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
                        'X-Api-Key': import.meta.env.VITE_API_KEY_BACKEND
                    }
                }
            );
            login(response.data.jwt)
            navigate('/portfolio');
        } catch (e) {
            console.error("er ging iets mis met inloggen", e);
        }
    }

    return (
        <section className="login-section">

            <div className="login-inner">

                <header>Inloggen</header>

                <form onSubmit={handleSubmit}>

                    <div className='input-login'>

                        <div className='text'>Gebruikersnaam:</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className='text'>Wachtwoord:</div>
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
                            Inloggen
                        </ButtonSort>
                    </div>

                </form>
            </div>
        </section>
    );
}

export default LoginPage;