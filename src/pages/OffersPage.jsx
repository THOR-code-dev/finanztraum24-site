import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { FaPercentage, FaEuroSign, FaMoneyBillWave } from 'react-icons/fa';
import './OffersPage.css';

const calcMonthly = (amount, rateAnnual, termMonths) => {
  const r = rateAnnual / 12 / 100;
  const m = amount * r / (1 - Math.pow(1 + r, -termMonths));
  return Math.round(m);
};

const OffersPage = () => {
  const { state } = useLocation();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const amount = state?.amount || 10000;
  const term = state?.term || 60; // months

  useEffect(() => {
    let minDelay = setTimeout(() => {}, 2000); // ensure 2s spinner
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bank-offers?amount=${amount}&term=${term}`)
      .then(r => r.json())
      .then(data => {
        setOffers(data);
      })
      .catch(() => setOffers([]))
      .finally(() => {
        clearTimeout(minDelay);
        setLoading(false);
      });
  }, [amount, term]);

  if (loading) return <LoadingOverlay />;

  return (
    <div className="offers-container">
      <h1>Kreditangebote</h1>
      <div className="offers-grid">
        {offers.map(o => {
          const monthly = calcMonthly(amount, o.rate, term);
          return (
            <div className="offer-card" key={o.bank}>
              <div className="bank-info">
                <img src={o.logo || ''} alt={o.bank} className="bank-logo" />
                <h2 className="bank-name">{o.bank}</h2>
              </div>
              <div className="offer-details">
                <div className="detail-item">
                  <span className="detail-label"><FaPercentage />&nbsp;Zinssatz&nbsp;p.a.</span>
                  <span className="detail-value">{o.rate.toFixed(2)}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><FaEuroSign />&nbsp;Monatliche&nbsp;Rate</span>
                  <span className="detail-value">{monthly.toLocaleString('de-DE')} €</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label"><FaMoneyBillWave />&nbsp;Gesamtkosten</span>
                  <span className="detail-value">{(monthly * term).toLocaleString('de-DE')} €</span>
                </div>
              </div>
              <button className="btn-primary select-offer">Angebot auswählen</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersPage;
