import React from 'react';
import './OnBasvuruPage.css';
import CreditCalculatorForm from '../components/CreditCalculatorForm';
// import logoImg from '../assets/logo.svg';
// import bankImg1 from '../assets/bank1.png';
// import bankImg2 from '../assets/bank2.png';
// import bankImg3 from '../assets/bank3.png';
// import bankImg4 from '../assets/bank4.png';
// import bankImg5 from '../assets/bank5.png';
// import trustLogo1 from '../assets/trust1.png';
// import trustLogo2 from '../assets/trust2.png';
// import trustLogo3 from '../assets/trust3.png';
// import phoneMockup from '../assets/phone-mockup.png';
import { Link } from 'react-router-dom';
import { FaHome, FaIdCard, FaChartLine, FaCheckCircle, FaHandshake, FaPhone, FaUser } from 'react-icons/fa';

const OnBasvuruPage = () => {
    return (
        <div className="onbasvuru-page">
            {/* Header - HomePage ile aynı header */}
            <header className="site-header" id="basvuru-header">
                <div className="container">
                    <div className="header-left">
                        {/* <img src={logoImg} alt="Logo" className="header-logo" /> */}
                        <div className="brand-text">
                            <div className="brand-name">FINANZTRAUM24</div>
                            <div className="brand-slogan">DIE EXPERTEN FÜR IMMOBILIEN UND PRIVATKREDITE</div>
                        </div>
                    </div>

                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/" className="active">Home</Link></li>
                            <li><a href="#">Über Mich</a></li>
                            <li className="dropdown">
                                <a href="#">Leistungen: <span className="dropdown-arrow">▾</span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Immobilien</a></li>
                                    <li><a href="#">Finanzierung</a></li>
                                    <li><a href="#">Fördermittel Beratung</a></li>
                                    <li><a href="#">kfW Beratung</a></li>
                                </ul>
                            </li>
                            <li><Link to="/on-basvuru">Referenzen</Link></li>
                            <li className="dropdown">
                                <a href="#">Kontakt <span className="dropdown-arrow">▾</span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Kontakt</a></li>
                                    <li><a href="#">Impressum</a></li>
                                    <li><a href="#">Datenschutz</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="onbasvuru-container">
                <div className="onbasvuru-header">
                    <h1>Voranmeldung</h1>
                    <p>Bewerben Sie sich schnell ohne Kreditkarte, Gehaltsabrechnung oder Bankinformationen.</p>
                </div>

                <div className="onbasvuru-content">
                    <div className="onbasvuru-form-column">
                        <div className="credit-form-container">
                            <CreditCalculatorForm />
                        </div>

                        <div className="trust-seals">
                            <div className="trust-logos">
                                <div className="logo-item">
                                    {/* <img src={trustLogo1} alt="Trust Seal" /> */}
                                </div>
                                <div className="logo-item">
                                    {/* <img src={trustLogo2} alt="Trust Seal" /> */}
                                </div>
                                <div className="logo-item">
                                    {/* <img src={trustLogo3} alt="Trust Seal" /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="onbasvuru-info-column">
                        <div className="phone-mockup">
                            {/* <img src={phoneMockup} alt="Phone Mockup" className="phone-image" /> */}
                        </div>

                        <div className="info-checklist">
                            <ul>
                                <li>✓ Kostenlose Kreditbeantragung in 3 Minuten</li>
                                <li>✓ Ohne Auswirkung auf Ihren SCHUFA-Score</li>
                                <li>✓ Erhalten Sie sofort ein Kreditangebot</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="partner-banks">
                    <h3>Unsere Partner</h3>
                    <div className="bank-logos">
                        <div className="logo-wrapper">{/* <img src={bankImg1} alt="Bank Logo" /> */}</div>
                        <div className="logo-wrapper">{/* <img src={bankImg2} alt="Bank Logo" /> */}</div>
                        <div className="logo-wrapper">{/* <img src={bankImg3} alt="Bank Logo" /> */}</div>
                        <div className="logo-wrapper">{/* <img src={bankImg4} alt="Bank Logo" /> */}</div>
                        <div className="logo-wrapper">{/* <img src={bankImg5} alt="Bank Logo" /> */}</div>
                    </div>

                    <a href="#" className="teilnehmende-banken">Alle teilnehmenden Banken anzeigen</a>
                </div>

                <div className="konditionen-section">
                    <h3>Kreditbedingungen</h3>
                    <p>Jährliche Zinssätze: 0,68% - 16,99%; Effektiver Jahreszins: 0,68% - 17,99%; Laufzeit: 12 - 120 Monate; Zweck: Freie Verwendung; Mindestkredit: 1.000 €; Maximaler Kreditbetrag: 250.000 €</p>
                    <p>Vorsicht vor Betrug! FINANZCHECK.de verlangt keine Vorauszahlung für Kredite und leistet keine Barzahlungen.</p>
                </div>
            </div>
        </div>
    );
};

export default OnBasvuruPage; 