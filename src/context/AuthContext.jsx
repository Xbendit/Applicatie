import {createContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        console.log(JWT)
        const decoded = jwtDecode(JWT);
        console.log(decoded)
        void fetchUserData(decoded.sub, JWT, '/portfolio');

    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            }
        );
        console.log('Gebruiker is uitgelogd')
        navigate('/');

    }

    async function fetchUserData(id, JWT) {
        try {
            // haal gebruikersdata op met de token en id van de gebruiker
            const result = await axios.get(`https://api.datavortex.nl/cryptoapp/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            console.log(result)
// zet de gegevens in de state
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                },
                status: 'done',
            });
            console.log(isAuth)
            /*if (redirectUrl) {
                navigate(redirectUrl);
            }*/
        } catch (e) {
            console.error(e);
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }

    }

    const contextData = {
        ...isAuth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;