import {Route, Routes } from 'react-router-dom';
import Home from './pages/homePage/Home.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import PortfolioPage from './pages/portfolioPage/PortfolioPage.jsx';
import PostDetail from './pages/postDetailPage/PostDetail.jsx';
import './App.css'
import NotFound from './pages/notFoundPage/NotFound.jsx';
import Navigation from './components/navigation/Navigation.jsx';

function App() {


    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<LoginPage />} />
                    <Route path="/posts" element={<PortfolioPage />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer className="footer-navigation outer-content-container">
                BitGO &copy; 2025
            </footer>
        </>
    )
}

export default App