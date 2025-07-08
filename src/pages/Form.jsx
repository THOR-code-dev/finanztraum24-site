import React from 'react';
import { motion } from 'framer-motion';
import { useFormTransition } from '../hooks/useAnimations.jsx';
import '../styles/form.css';

const Form = () => {
  const { isExiting, isEntering, handleTransition } = useFormTransition();

  const sections = [
    {
      title: 'Persönliche Daten',
      fields: [
        { label: 'Vorname', type: 'text' },
        { label: 'Nachname', type: 'text' },
        { label: 'E-Mail', type: 'email' },
        { label: 'Telefon', type: 'tel' }
      ]
    },
    {
      title: 'Kreditinformationen',
      fields: [
        { label: 'Kreditbetrag', type: 'number' },
        { label: 'Laufzeit', type: 'number' },
        { label: 'Zweck', type: 'text' }
      ]
    }
    // Diğer bölümler...
  ];

  return (
    <div className="form-container">
      <motion.div
        className="form-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Kreditantrag</h2>
        <div className="progress">
          <div className="progress-bar" style={{ width: '50%' }}></div>
        </div>
      </motion.div>

      <motion.div
        className="form-content"
        initial={{ opacity: 0, x: 20 }}
        animate={isEntering ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        exit={isExiting ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="form-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3>{section.title}</h3>
            <div className="form-grid">
              {section.fields.map((field, fieldIndex) => (
                <div className="form-group" key={fieldIndex}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={`Dein ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="form-actions">
          <button
            onClick={() => handleTransition('prev')}
            className="btn btn-secondary"
          >
            Zurück
          </button>
          <button
            onClick={() => handleTransition('next')}
            className="btn btn-primary"
          >
            Weiter
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Form;
