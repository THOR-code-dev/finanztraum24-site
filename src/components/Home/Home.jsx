import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useAnimations.jsx';
import './Home.css';

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useScrollAnimation();
  const { ref: calcRef, inView: calcInView } = useScrollAnimation();
  const { ref: offersRef, inView: offersInView } = useScrollAnimation();
  const { ref: partnersRef, inView: partnersInView } = useScrollAnimation();

  // Teklif kartları için stagger animasyon
  const offers = [
    { id: 1, bank: 'Deutsche Bank', interest: '2.99%', monthly: '199 €' },
    { id: 2, bank: 'Commerzbank', interest: '3.25%', monthly: '205 €' },
    { id: 3, bank: 'ING', interest: '3.15%', monthly: '202 €' }
  ];

  return (
    <div className="home">
      <motion.div
        ref={heroRef}
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Finanztraum24</h1>
        <p>Dein Partner für individuelle Finanzlösungen</p>
        <div className="cta">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sofort kalkulieren
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        ref={calcRef}
        className="calc-widget"
        initial={{ opacity: 0, y: 20 }}
        animate={calcInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Kreditkalkulator</h2>
        <div className="calc-form">
          <div className="calc-input">
            <input type="number" placeholder="Kreditbetrag" />
            <select>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="calc-input">
            <input type="number" placeholder="Laufzeit (in Monaten)" />
          </div>
          <button>Kalkulieren</button>
        </div>
      </motion.div>

      <motion.div
        ref={offersRef}
        className="offers-grid"
        initial={{ opacity: 0 }}
        animate={offersInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Unsere besten Angebote</h2>
        <div className="grid">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="offer-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <h3>{offer.bank}</h3>
              <div className="interest">{offer.interest}</div>
              <div className="monthly">{offer.monthly}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={partnersRef}
        className="partners-section"
        initial={{ opacity: 0 }}
        animate={partnersInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Unsere Partner</h2>
        <div className="partners-grid">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <motion.div
              key={id}
              className="partner-logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Partner logo */}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
