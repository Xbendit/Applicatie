import './RegisterPage.css';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ButtonSort from "../../components/button/ButtonSort.jsx";


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

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
                        'X-Api-Key': import.meta.env.VITE_API_KEY_BACKEND
                    }
                }
            );
            navigate('/login');
        } catch(e) {
            console.error("er ging iets mis registeren", e);
        }
    }

    return (
        <section className="register-section">

            <div className="register-inner">
                <header>Registreren</header>
                <form onSubmit={handleSubmit}>

                    <div className='input-register'>

                        <div className='text'>Emailadres:</div>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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

                        <div className='button-register'>

                            <ButtonSort
                                onClick="submit"
                                className='registerbutton'

                            >
                                Registreren
                            </ButtonSort>

                        </div>
                    </div>
                </form>
                <div>
                    <p>Heb je al een account?</p>
                    <p>Je kunt je <Link to="/login">hier</Link> inloggen.</p>
                </div>
            </div>

        </section>

    );
}

export default RegisterPage;