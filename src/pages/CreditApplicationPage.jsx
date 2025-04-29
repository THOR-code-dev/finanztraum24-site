import React from 'react';
import CreditApplicationForm from '../components/CreditApplicationForm';
import './CreditApplicationPage.css';
import { Link } from 'react-router-dom';

const CreditApplicationPage = () => {
    return (
        <div className="credit-application-page">
            <header className="application-header">
                <Link to="/" className="logo-container">
                    <div className="logo-pulse"></div>
                    <span className="logo-text">FINANZTRAUM24</span>
                </Link>
                <div className="contact-info">
                    <div className="contact-text">Ücretsiz danışma</div>
                    <div className="contact-phone">0800 433 88 77</div>
                    <div className="phone-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"></path>
                        </svg>
                    </div>
                </div>
            </header>

            <main className="application-main">
                <div className="floating-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
                <CreditApplicationForm />
            </main>

            <footer className="application-footer">
                <div className="footer-content">
                    <p>© 2024 FINANZTRAUM24. Tüm hakları saklıdır.</p>
                    <div className="footer-links">
                        <Link to="/">Ana Sayfa</Link>
                        <a href="#">Gizlilik Politikası</a>
                        <a href="#">Kullanım Şartları</a>
                        <a href="#">İletişim</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CreditApplicationPage; 