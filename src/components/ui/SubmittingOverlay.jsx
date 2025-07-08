import React from 'react';
import './SubmittingOverlay.css';

const SubmittingOverlay = () => {
  return (
    <div className="submitting-overlay">
      <div className="submitting-box">
        <div className="spinner" />
        <p>Antrag wird gesendet...</p>
      </div>
    </div>
  );
};

export default SubmittingOverlay;
