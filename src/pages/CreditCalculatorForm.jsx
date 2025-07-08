import React from 'react';
import { motion } from 'framer-motion';
import '../styles/form.css';

const CreditCalculatorForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic
  };

  return (
    <div className="calculator-container">
      <motion.div
        className="calculator-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Kreditkalkulator</h1>
        <p>Berechnen Sie Ihre persönliche Rate</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="calculator-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-group">
          <label htmlFor="amount">Kreditbetrag</label>
          <input
            type="number"
            id="amount"
            placeholder="z.B. 10000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Laufzeit (in Monaten)</label>
          <input
            type="number"
            id="duration"
            placeholder="z.B. 60"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interest">Zinssatz (%)</label>
          <input
            type="number"
            id="interest"
            step="0.01"
            placeholder="z.B. 3.5"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="calc-btn"
        >
          Berechnen
        </motion.button>
      </motion.form>
    </div>
  );
};

export default CreditCalculatorForm;
