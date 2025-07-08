import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from './hooks/useAnimations.jsx';
import Home from './pages/HomePage.jsx';
import Form from './pages/Form.jsx';
import Offers from './pages/Offers.jsx';
import CreditApplicationPage from './pages/CreditApplicationPage.jsx';
import CreditCalculatorForm from './pages/CreditCalculatorForm.jsx';
import OnBasvuruPage from './pages/OnBasvuruPage.jsx';
import './App.css';

// Sayfa geçişleri için kullanılacak animasyon bileşeni
const AnimatedRoutes = () => {
    const location = useLocation();
    const { isExiting, isEntering } = usePageTransition();

    // Sayfa geçiş animasyonları için varsayılan değerler
    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.4, ease: "easeInOut" }
    };

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/application" element={
                    <motion.div {...pageTransition}>
                        <CreditApplicationPage />
                    </motion.div>
                } />
                <Route path="/credit-application" element={
                    <motion.div {...pageTransition}>
                        <CreditApplicationPage />
                    </motion.div>
                } />
                <Route path="/kredi-hesaplama" element={
                    <motion.div {...pageTransition}>
                        <CreditCalculatorForm />
                    </motion.div>
                } />
                <Route path="/on-basvuru" element={
                    <motion.div {...pageTransition}>
                        <OnBasvuruPage />
                    </motion.div>
                } />
                <Route path="/offers" element={
                    <motion.div {...pageTransition}>
                        <Offers />
                    </motion.div>
                } />
                <Route path="/" element={
                    <motion.div {...pageTransition}>
                        <Home />
                    </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
};

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
            <AnimatedRoutes />
        </Router>
    );
}

export default App; 