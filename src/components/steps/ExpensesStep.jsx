import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEuroSign } from 'react-icons/fa';

const ExpensesStep = ({ formData, handleRadioChange, animationClass, warmMieteError }) => {
    const [infoCollapsed, setInfoCollapsed] = useState(true);

    const toggleCollapsible = () => {
        setInfoCollapsed(!infoCollapsed);
    };

    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title" style={{ backgroundColor: 'transparent' }}>Ausgaben</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={toggleCollapsible}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Ausgaben können sich auch positiv auf Ihre Bonität auswirken</strong></p>
                    <p>Regelmäßige Ausgaben beeinflussen Ihre Bonität, denn sie schmälern Ihr verfügbares Einkommen. Dennoch stufen Banken Ausgaben für die Beurteilung Ihrer Kreditwürdigkeit unterschiedlich ein.</p>
                    <p>So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ backgroundColor: 'transparent' }}>Warmmiete <span className="required-field">*</span></label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        min="0"
                        max="30000"
                        step="1"
                        placeholder="z.B. 2222"
                        value={formData.warmMiete}
                        onChange={(e) => handleRadioChange('warmMiete', e.target.value)}
                        required
                        className={`form-input ${warmMieteError ? 'input-error' : ''}`}
                    />
                    <span className="currency-symbol"><FaEuroSign /></span>
                </div>
                {warmMieteError && <p className="error-message">{warmMieteError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label" style={{ backgroundColor: 'transparent' }}>Sind Sie privat krankenversichert? (ohne Zusatzversicherungen)</label>
                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="privateKrankenversicherung"
                            value="ja"
                            checked={formData.privateKrankenversicherung === 'ja'}
                            onChange={() => handleRadioChange('privateKrankenversicherung', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="privateKrankenversicherung"
                            value="nein"
                            checked={formData.privateKrankenversicherung === 'nein'}
                            onChange={() => handleRadioChange('privateKrankenversicherung', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
                {formData.privateKrankenversicherung === 'ja' && (
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label" style={{ backgroundColor: 'transparent' }}>Private Krankenversicherung</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.privatKrankenkasseBeitrag || ''}
                                onChange={(e) => handleRadioChange('privatKrankenkasseBeitrag', e.target.value)}
                                className="form-input"
                            />
                            <span className="currency-symbol"><FaEuroSign /></span>
                        </div>
                        <p className="form-info-text">
                            Nennen Sie uns bitte den monatlichen Beitrag für Ihre private Krankenversicherung, den Sie als Arbeitnehmer selbst zahlen. Wichtig: Nicht gemeint sind hier private Zusatzversicherungen für gesetzlich Versicherte.
                        </p>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label" style={{ backgroundColor: 'transparent' }}>Zahlen Sie Ehegattenunterhalt?</label>
                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="ehegattenunterhalt"
                            value="ja"
                            checked={formData.ehegattenunterhalt === 'ja'}
                            onChange={() => handleRadioChange('ehegattenunterhalt', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="ehegattenunterhalt"
                            value="nein"
                            checked={formData.ehegattenunterhalt === 'nein'}
                            onChange={() => handleRadioChange('ehegattenunterhalt', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>

                {formData.ehegattenunterhalt === 'ja' && (
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label" style={{ backgroundColor: 'transparent' }}>Ehegattenunterhalt Betrag</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.ehegattenunterhaltBetrag || ''}
                                onChange={(e) => handleRadioChange('ehegattenunterhaltBetrag', e.target.value)}
                                className="form-input"
                            />
                            <span className="currency-symbol"><FaEuroSign /></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ExpensesStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
    warmMieteError: PropTypes.string,
};

ExpensesStep.defaultProps = {
    warmMieteError: '',
};

export default ExpensesStep;
