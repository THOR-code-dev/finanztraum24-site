import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { FaHome, FaIdCard, FaChartLine, FaCheckCircle, FaHandshake, FaPhone, FaUser, FaBars } from 'react-icons/fa';
import CreditCalculatorForm from '../components/CreditCalculatorForm';

const HomePage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const calculatorRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleCalculator = () => {
        setShowCalculator(!showCalculator);
    };

    // İlk yükleme ve scroll olayını dinle
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero-image-container');
            const benefitsSection = document.querySelector('.benefits');

            if (heroSection && benefitsSection) {
                // Hero bölümünün alt sınırı
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

                // Sayfa kaydırma miktarı hero bölümünü geçtiyse
                if (scrollY > heroBottom - 150) {
                    // Float moduna geç
                    setIsScrolled(true);
                } else {
                    // Normal scroll davranışı
                    setIsScrolled(false);
                }
            }
        };

        // İlk yükleme kontrolü
        handleScroll();

        // Scroll olayını dinle
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="homepage">
            {/* Header / Navigation */}
            <header className="site-header" id="main-header">
                <div className="container">
                    <div className="header-left">
                        <img src="/svg-logo-pattern.png" alt="Logo" className="header-logo" />
                        <div className="brand-text">
                            <div className="brand-name">FINANZTRAUM24</div>
                            <div className="brand-slogan">DIE EXPERTEN FÜR IMMOBILIEN UND PRIVATKREDITE</div>
                        </div>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><a href="#" className="active">Home</a></li>
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

                    {/* Mobil Menü Toggle Butonu */}
                    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            {/* Mobil Menü */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="#" className="active">Home</a></li>
                    <li><a href="#">Über Mich</a></li>
                    <li><a href="#">Immobilien</a></li>
                    <li><a href="#">Finanzierung</a></li>
                    <li><a href="#">Fördermittel Beratung</a></li>
                    <li><a href="#">kfW Beratung</a></li>
                    <li><Link to="/on-basvuru">Referenzen</Link></li>
                    <li><a href="#">Kontakt</a></li>
                    <li><a href="#">Impressum</a></li>
                    <li><a href="#">Datenschutz</a></li>
                </ul>
            </div>

            {/* Mobil Overlay */}
            <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>

            {/* Hero ve diğer içerikler için kapsayıcı */}
            <div className="page-content">
                {/* Hero Image */}
                <section className="hero-image-container">
                    <img src="/calisaninsan1.png" alt="Arbeitender Mensch" className="full-width-image" />
                    <div className="hero-overlay"></div>
                    <div className="hero-top-overlay"></div>
                </section>

                {/* Kredi Hesaplama CTA - Form butonları gibi sticky yapıda */}
                <div ref={calculatorRef} className="credit-calculator-cta">
                    <div className="form-container">
                        <div className="form-step">
                            <div className={`credit-buttons-container ${isScrolled ? 'float-cta' : ''}`}>
                                <button
                                    className="credit-button primary-button"
                                    onClick={toggleCalculator}
                                >
                                    {showCalculator ? 'Formular schließen' : 'Kreditberechnung starten'}
                                </button>

                                {showCalculator && (
                                    <div className="credit-calculator-popup">
                                        <CreditCalculatorForm />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <section className="benefits">
                    <div className="container">
                        <div className="benefits-left">
                            <div className="benefits-list">
                                <div className="benefit-item">
                                    <span className="check-icon">✓</span>
                                    <div className="benefit-text">
                                        <h4>Individuelle Beratung</h4>
                                        <p>Maßgeschneiderte Finanzstrategien, die auf die persönlichen Ziele und Bedürfnisse jedes Kunden abgestimmt sind.</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="check-icon">✓</span>
                                    <div className="benefit-text">
                                        <h4>Expertenwissen</h4>
                                        <p>Ein Team von erfahrenen Finanzberatern mit umfassendem Wissen über aktuelle Markttrends, Anlagestrategien und Finanzprodukte.</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="check-icon">✓</span>
                                    <div className="benefit-text">
                                        <h4>Zielorientierte Planung</h4>
                                        <p>Entwicklung klarer und erreichbarer Ziele sowie Strategien zur Verwirklichung dieser Ziele.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="benefits-right">
                            <h2>Finanzkompetenz:</h2>
                            <h3>Özen Finanzierungs­experte</h3>
                            <p>Als Finanzexperte mit jahrzehntelanger Erfahrung in der Finanzberatung steht Özen Finanzierungsexperte an Ihrer Seite.</p>
                            <p>Mein Ziel ist es, Ihre finanziellen Angelegenheiten zu optimieren und Ihnen dabei zu helfen, Ihre Ziele zu erreichen. Meine Fachkompetenz in verschiedenen Finanzthemen ermöglicht es mir, individuelle Lösungen für Ihre spezifischen Bedürfnisse zu finden. Mit Sitz in Bayern bin ich stolz darauf, meine Kunden ein Höchstmaß an Professionalität und Zuverlässigkeit zu bieten.</p>
                            <p>Vertrauen Sie auf Özen Finanzierungsexperte, Ihren Experten für Finanzfragen.</p>
                            <div className="cta-buttons">
                                <a href="#" className="btn btn-primary">Kontakt</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="about">
                    <div className="container">
                        <div className="about-left">
                            <h2>Über Özen Finanzierungsexperte:</h2>
                            <h3>Ihr Finanzexperte</h3>
                            <p>Bei Özen Finanzierungsexperte liegt Ihr finanzielles Wohl in erfahrenen Händen. Als renommierte Finanzberatung in Bayern stehe ich für maßgeschneiderte Lösungen und kompetente Beratung.</p>
                            <p>Denn Ihre Individualität ist mein Leitfaden. Ich verstehe, dass jede finanzielle Situation einzigartig ist und erfordern maßgeschneiderte Strategien.</p>
                            <p>Mit meiner Expertise und meinen Engagement helfe ich Ihnen, Ihre finanziellen Ziele zu erreichen.</p>
                            <div className="about-check-item">
                                <span className="check-icon">✓</span>
                                <p>Vertrauen Sie auf Özen Finanzierungsexperte - Ihr Partner für maßgeschneiderte Finanzlösungen.</p>
                            </div>
                            <div className="about-cta">
                                <a href="#" className="btn btn-secondary">Über mich</a>
                            </div>
                        </div>
                        <div className="about-right">
                            <div className="about-image">
                                <img src="https://placehold.co/600x400/111/F2CD83?text=Finanzexperte" alt="Finanzexperte Özen" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats">
                    <div className="container">
                        <div className="stats-container">
                            <h2>Die besten Konditionen für Ihre Vorhaben</h2>
                            <div className="stats-items">
                                <div className="stat-item">
                                    <h3>Vergleich von</h3>
                                    <p className="stat-value">600 Bank Partnern</p>
                                </div>
                                <div className="stat-item">
                                    <h3>Mehr als</h3>
                                    <p className="stat-value">28 Jahre Erfahrung</p>
                                </div>
                                <div className="stat-item">
                                    <h3>Beratung</h3>
                                    <p className="stat-value">Digital und vor Ort</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="services">
                    <div className="container">
                        <h2 className="section-title">Meine Leistungen</h2>
                        <p className="section-subtitle">Bei Özen Finanzierungsexperte erwartet Sie eine breite Palette an Finanzdienstleistungen, die speziell auf Ihre Bedürfnisse abgestimmt sind.</p>

                        <div className="services-grid">
                            <div className="service-card">
                                <div className="service-icon"><FaHome /></div>
                                <h3>Immobilien</h3>
                                <p>Verwirklichen Sie Ihren Traum vom Eigenheim mit meiner individuellen Finanzberatung!</p>
                                <a href="#" className="more-link">+ MEHR</a>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><FaIdCard /></div>
                                <h3>Finanzierung</h3>
                                <p>Entdecken Sie maß–geschneiderte Finanzierungs–lösungen für Ihre Träume.</p>
                                <a href="#" className="more-link">+ MEHR</a>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><FaHandshake /></div>
                                <h3>Fördermittel Beratung</h3>
                                <p>Profitieren Sie von meiner Expertise. Wir finden passende Fördermittel für Ihre Projekte.</p>
                                <a href="#" className="more-link">+ MEHR</a>
                            </div>
                            <div className="service-card">
                                <div className="service-icon"><FaChartLine /></div>
                                <h3>kfW Beratung</h3>
                                <p>Profitieren Sie von meiner Expertise in kfW Beratung. Ich navigiere Sie sicher durch Förderprogramme.</p>
                                <a href="#" className="more-link">+ MEHR</a>
                            </div>
                        </div>

                        <div className="services-list">
                            <div className="service-item">
                                <span className="check-icon">✓</span>
                                <p>Ratenkredit und Autokredit</p>
                            </div>
                            <div className="service-item">
                                <span className="check-icon">✓</span>
                                <p>Versicherungen</p>
                            </div>
                            <div className="service-item">
                                <span className="check-icon">✓</span>
                                <p>Handwerker Service</p>
                            </div>
                            <div className="service-item">
                                <span className="check-icon">✓</span>
                                <p>Beantragung von Energieausweis</p>
                            </div>
                            <div className="service-item">
                                <span className="check-icon">✓</span>
                                <p>Kooperationen, Makler, Energieberater und Handwerker</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="contact-cta">
                    <div className="container">
                        <div className="contact-icon"><FaPhone /></div>
                        <h2>Sie sind bereits überzeugt?</h2>
                        <h3>Jetzt Kontakt aufnehmen mit Özen Finanzierungsexperte</h3>
                        <p>Bei Özen Finanzierungsexperte stehen Sie als Kunde im Mittelpunkt meiner Arbeit. Haben Sie Fragen zu meinen Finanzierungslösungen oder wünschen Sie eine persönliche Beratung?</p>
                        <p>Zögern Sie nicht, mit mir in Kontakt zu treten.</p>
                        <a href="#" className="btn btn-primary">Kontaktieren</a>

                        <div className="contact-info-box">
                            <div className="contact-person">
                                <div className="contact-person-icon"><FaUser /></div>
                                <div className="contact-person-info">
                                    <h4>Ihr Ansprechpartner Erkan Özen</h4>
                                    <p>Meine Erreichbarkeit ist von Mo - Fa 08:00 Uhr - 20:00 Uhr</p>
                                </div>
                            </div>
                            <div className="contact-phone">+49151 626 014 39</div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="site-footer">
                <div className="container">
                    <div className="footer-widgets">
                        <div className="footer-widget">
                            <h4>Özen Finanzierungsexperte</h4>
                            <p>Vertrauen Sie auf meine Fachkompetenz in der Finanzwelt.</p>
                            <div className="social-icons">
                                <a href="#" className="social-icon">I</a>
                                <a href="#" className="social-icon">W</a>
                            </div>
                        </div>
                        <div className="footer-widget">
                            <h4>Adresse</h4>
                            <p>Wienerstr. 62<br />42657 Solingen</p>
                        </div>
                        <div className="footer-widget">
                            <h4>In Verbindung bleiben</h4>
                            <p>Telefon: +49 151 626 014 39<br />E-Mail: info@finanztraum24.de</p>
                        </div>
                        <div className="footer-widget">
                            <h4>Interne Links</h4>
                            <ul>
                                <li><a href="#">Datenschutz</a></li>
                                <li><a href="#">Impressum</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-left">
                            Wenig Zeit, aber Finanzberatung muss sein? <a href="#">Termin buchen</a> – ich habe immer Zeit für Sie!
                        </div>
                        <div className="footer-bottom-right">
                            Letzte Änderung: {new Date().toLocaleDateString()} © {new Date().getFullYear()} Özen Finanzierungsexperte
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage; 