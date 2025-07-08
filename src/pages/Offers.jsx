import React from 'react';
import { motion } from 'framer-motion';
import '../styles/offers.css';

const Offers = () => {
  const offers = [
    {
      id: 1,
      bank: 'Deutsche Bank',
      interest: '2.99%',
      monthly: '199 €',
      features: [
        'Keine Verwaltungskosten',
        'Flexibler Laufzeit',
        'Günstige Zinsbindung'
      ]
    },
    {
      id: 2,
      bank: 'Commerzbank',
      interest: '3.25%',
      monthly: '205 €',
      features: [
        'Schnelle Bearbeitung',
        'Gute Konditionen',
        'Online-Service'
      ]
    },
    {
      id: 3,
      bank: 'ING',
      interest: '3.15%',
      monthly: '202 €',
      features: [
        'Mobile App',
        '24/7 Service',
        'Flexibles Tilgungsprofil'
      ]
    }
  ];

  return (
    <div className="offers-page">
      <motion.div
        className="offers-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Unsere Kreditangebote</h1>
        <p>Wählen Sie aus verschiedenen Kreditangeboten</p>
      </motion.div>

      <motion.div
        className="offers-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            className="offer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: offer.id * 0.1
            }}
          >
            <div className="offer-header">
              <h3>{offer.bank}</h3>
              <div className="interest-rate">{offer.interest}</div>
            </div>
            <div className="offer-details">
              <div className="monthly-payment">{offer.monthly}</div>
              <ul className="features">
                {offer.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="apply-btn">Jetzt beantragen</button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Offers;
