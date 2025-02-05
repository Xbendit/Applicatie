import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/homePage/Home.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import PortfolioPage from './pages/portfolioPage/PortfolioPage.jsx';
import RegisterPage from './pages/registerPage/RegisterPage.jsx';
import './App.css'
import NotFound from './pages/notFoundPage/NotFound.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/portfolio" element={isAuth ? <PortfolioPage /> : <Navigate to ="/login"/>} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer className="footer-BitBen">
                BitGO &copy; 2025
            </footer>
        </>
    )
}

export default App