import React from 'react';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

const BankDetailsStep = ({ formData, handleRadioChange, warumBankInfoCollapsed, toggleWarumBankInfo, ibanVerifyStatus, ibanVerifyMessage, handleSubmit }) => {
    return (
        <div className="form-content">
            <h2 className="form-title">Letzte Seite vor Ihren Angeboten</h2>

            <div className="collapsible-info warum-fragen-wir-das bank-info-collapse">
                <button
                    type="button"
                    className={`collapsible-btn ${warumBankInfoCollapsed ? '' : 'active'}`}
                    onClick={toggleWarumBankInfo}
                >
                    Warum fragen wir das?
                    <span className={`arrow-down ${warumBankInfoCollapsed ? '' : 'rotated'}`}>▼</span>
                </button>
                <div className={`collapsible-content ${warumBankInfoCollapsed ? 'collapsed' : ''}`}>
                    <p>Die Angabe Ihrer Bankverbindung ist notwendig, um Ihnen personalisierte Kreditangebote erstellen und die Auszahlung im Falle einer Zusage ermöglichen zu können.</p>
                </div>
            </div>

            <div className="bank-procedure-tabs">
                <button
                    type="button"
                    className={`tab-option ${formData.bankProcedureSpeed === 'schnell' ? 'active' : ''}`}
                    onClick={() => handleRadioChange('bankProcedureSpeed', 'schnell')}
                >
                    <span className="tab-icon">⚡️</span>
                    <span className="tab-text">MIT SCHNELLEM BANKVERFAHREN</span>
                </button>
                <button
                    type="button"
                    className={`tab-option ${formData.bankProcedureSpeed === 'ohne' ? 'active' : ''}`}
                    onClick={() => handleRadioChange('bankProcedureSpeed', 'ohne')}
                >
                    <span className="tab-icon">⏳</span>
                    <span className="tab-text">OHNE SCHNELLES BANKVERFAHREN</span>
                </button>
            </div>

            {formData.bankProcedureSpeed === 'schnell' && (
                <ul className="benefits-list">
                    <li className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span className="benefit-text">Im Durchschnitt 3,5 % niedrigere Kreditzinsen</span>
                    </li>
                    <li className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span className="benefit-text">Ca. 40 % höhere Kreditwahrscheinlichkeit</span>
                    </li>
                    <li className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span className="benefit-text">Mit Sofortauszahlung innerhalb 1 Stunde</span>
                    </li>
                </ul>
            )}

            <div className="form-group">
                <label className="form-label">Kontoinhaber</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Vollständiger Name"
                        value={formData.kontoinhaber}
                        onChange={(e) => handleRadioChange('kontoinhaber', e.target.value)}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Bankverbindung zur Kreditauszahlung</label>
                <div className="radio-options vertical">
                    <label className="radio-simple-container">
                        <input
                            type="radio"
                            name="bankConnectionPayout"
                            value="iban"
                            checked={formData.bankConnectionPayout === 'iban'}
                            onChange={(e) => handleRadioChange('bankConnectionPayout', e.target.value)}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">IBAN</span>
                    </label>
                    <label className="radio-simple-container">
                        <input
                            type="radio"
                            name="bankConnectionPayout"
                            value="konto"
                            checked={formData.bankConnectionPayout === 'konto'}
                            onChange={(e) => handleRadioChange('bankConnectionPayout', e.target.value)}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Konto-Nr. & BLZ</span>
                    </label>
                </div>
            </div>

            {formData.bankConnectionPayout === 'iban' && (
                <>
                    <div style={{ marginBottom: '10px', color: ibanVerifyStatus === 'valid' ? '#4CAF50' : '#E53E3E' }}>{ibanVerifyMessage}</div>
                    <div className="form-group">
                        <label className="form-label">IBAN</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="DE..."
                                value={formData.ibanPayout}
                                onChange={(e) => handleRadioChange('ibanPayout', e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <p className="form-hint bank-hint">
                            Auf Vergleichsportalen wird immer Ihre IBAN benötigt, um persönliche Kreditangebote erstellen zu können.
                        </p>
                    </div>
                </>
            )}

            {formData.bankConnectionPayout === 'konto' && (
                <>
                    <div className="form-group">
                        <label className="form-label">Kontonummer</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Kontonummer"
                                value={formData.kontoNrPayout}
                                onChange={(e) => handleRadioChange('kontoNrPayout', e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Bankleitzahl (BLZ)</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="BLZ"
                                value={formData.blzPayout}
                                onChange={(e) => handleRadioChange('blzPayout', e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="security-info">
                <div className="lock-icon">
                    <FaLock />
                </div>
                <div className="security-text">
                    <p>SSL-verschlüsselte Datenübertragung</p>
                    <p>Ihre Daten werden sicher übertragen und verarbeitet</p>
                </div>
            </div>

            <div className="trust-seals-final">
                <FaShieldAlt size={40} color="#F2CD83" />
                <FaLock size={40} color="#F2CD83" />
                <span>TÜV-geprüfte und SSL-verschlüsselte Verbindung</span>
            </div>
        </div>
    );
};

export default BankDetailsStep;
