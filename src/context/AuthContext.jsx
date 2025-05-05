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
        const decoded = jwtDecode(JWT);

        void fetchUserData(decoded.sub, JWT).then(() => {
            navigate('/portfolio');
        });

    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            }
        );
        navigate('/');

    }

    async function fetchUserData(id, JWT) {
        try {

            const result = await axios.get(`https://api.datavortex.nl/cryptoapp/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                },
            });
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                },
                status: 'done',
            });

        } catch (e) {
            console.error(e);
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