import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreditCalculatorForm from './components/CreditCalculatorForm';
import CreditApplicationPage from './pages/CreditApplicationPage';
import HomePage from './pages/HomePage';
import OnBasvuruPage from './pages/OnBasvuruPage';
import './App.css';

function App() {
    useEffect(() => {
        // Mobil meta tag'i güncelleme
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/application" element={<CreditApplicationPage />} />
                <Route path="/credit-application" element={<CreditApplicationPage />} />
                <Route path="/kredi-hesaplama" element={<CreditCalculatorForm />} />
                <Route path="/on-basvuru" element={<OnBasvuruPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App; 