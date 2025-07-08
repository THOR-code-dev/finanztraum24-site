import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaUserFriends } from 'react-icons/fa';

const CreditApplicantsStep = ({ formData, handleRadioChange, animationClass }) => (
    <div className={`form-content ${animationClass}`}>
        <h1 className="form-title">Ihr persönlicher Kreditvergleich</h1>

        <div className="certification-badge">
            <img src="/shield-check.png" alt="100% Schufa Neutral" />
        </div>

        <div className="form-info">
            <p>
                Persönliche Angebote gibt es nur nach einer Prüfung der
                Kreditwürdigkeit. Dafür benötigen wir Informationen zu Ihrer
                Person und finanziellen Situation.
            </p>

            <p>
                Nach Eingabe dieser Daten erhalten Sie von uns einen Überblick
                über die besten für Sie verfügbaren Kreditangebote.
            </p>
        </div>

        <div className="form-group">
            <label className="form-label">Anzahl Kreditnehmer</label>

            <div className="radio-options">
                <label className="radio-container">
                    <input
                        type="radio"
                        name="applicants"
                        value="1"
                        checked={formData.applicants === '1'}
                        onChange={() => handleRadioChange('applicants', '1')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaUser className="radio-icon" />
                        <span className="radio-text">1 Kreditnehmer</span>
                        <span className="radio-description">Einzelantrag für Ihre Finanzierung</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="applicants"
                        value="2"
                        checked={formData.applicants === '2'}
                        onChange={() => handleRadioChange('applicants', '2')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaUserFriends className="radio-icon" />
                        <span className="radio-text">2 Kreditnehmer</span>
                        <span className="radio-description">Gemeinsamer Antrag für bessere Konditionen</span>
                    </div>
                </label>
            </div>
        </div>
    </div>
);

CreditApplicantsStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
};

export default CreditApplicantsStep;
