import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEuroSign, FaInfoCircle } from 'react-icons/fa';

const IncomeStep = ({ formData, handleRadioChange, handleCounterChange, animationClass }) => {
    const [collapsibleState, setCollapsibleState] = useState({
        berufsgruppe: true,
        einkommen: true,
        sonstiges: true,
    });
    const [activeTooltip, setActiveTooltip] = useState(null);

    const toggleCollapsible = (section) => {
        setCollapsibleState(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleTooltip = (tooltip) => {
        setActiveTooltip(prev => (prev === tooltip ? null : tooltip));
    };

    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title">Berufsgruppe</h1>

            <div className="collapsible-info">
                <button type="button" className="collapsible-btn" onClick={() => toggleCollapsible('berufsgruppe')}>
                    Warum fragen wir das? <span className={`arrow-down ${!collapsibleState.berufsgruppe ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${collapsibleState.berufsgruppe ? 'collapsed' : ''}`}>
                    <p><strong>Unterschiedliche Berufsgruppen erhalten unterschiedliche Zinsen</strong></p>
                    <p>Die Höhe des Zinssatzes, Vertragslaufzeit und Kreditsumme richten sich auch nach Ihrer Berufsgruppe.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Berufsgruppe</label>
                <div className="select-wrapper">
                    <select value={formData.berufsgruppe} onChange={(e) => handleRadioChange('berufsgruppe', e.target.value)} className="form-select">
                        <option value="Angestellte/r">Angestellte/r</option>
                        <option value="Arbeiter/in">Arbeiter/in</option>
                        <option value="Beamte/r">Beamte/r</option>
                        <option value="Selbständig">Selbständig</option>
                        <option value="Rentner/in">Rentner/in</option>
                        <option value="Student/in">Student/in</option>
                        <option value="Auszubildende/r">Auszubildende/r</option>
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
                <p className="form-info-text">Wichtig: Wählen Sie eine Berufsgruppe aus der Liste aus, die Ihren aktuellen Beruf möglichst genau beschreibt. Dies kann sich positiv auf die Konditionen Ihres Kredits auswirken.</p>
            </div>

            <h2 className="section-title">Einkommen aus Haupttätigkeit</h2>

            <div className="collapsible-info">
                <button type="button" className="collapsible-btn" onClick={() => toggleCollapsible('einkommen')}>
                    Warum fragen wir das? <span className={`arrow-down ${!collapsibleState.einkommen ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${collapsibleState.einkommen ? 'collapsed' : ''}`}>
                    <p><strong>Banken mögen ein festes Einkommen</strong></p>
                    <p>Ihr Einkommen ist ein wichtiger Faktor bei der Berechnung Ihrer Kreditwürdigkeit.</p>
                </div>
            </div>

            <div className={`form-group ${activeTooltip === 'nettoeinkommen' ? 'has-active-tooltip' : ''}`}>
                <label className="form-label nettoeinkommen-label" style={{ backgroundColor: 'transparent', color: 'var(--accent-color)' }}>Nettoeinkommen</label>
                <div className="income-input-container">
                    <div className="income-input-wrapper">
                        <input
                            type="text"
                            className="income-input"
                            id="nettoeinkommen"
                            placeholder="z.B. 2500"
                            value={formData.nettoEinkommen}
                            onChange={(e) => handleRadioChange('nettoEinkommen', e.target.value)}
                        />
                        <span className="income-currency">
                            <FaEuroSign /> /Monat
                        </span>
                    </div>
                    <div className="income-info-icon" onClick={() => toggleTooltip('nettoeinkommen')}>
                        <FaInfoCircle />
                    </div>
                </div>
                {activeTooltip === 'nettoeinkommen' && (
                    <div className="income-tooltip">
                        Das monatliche Einkommen wird für Ihre Haushaltsrechnung benötigt. Diese wird von den Banken durchgeführt, um Ihr Kreditangebot zu ermitteln.
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Gab es bei Ihrem Einkommen monatliche Abweichungen von mehr als 100 € in den letzten 3 Monaten?</label>
                <div className="radio-options">
                    <label className="radio-container">
                        <input type="radio" name="einkommensAbweichung" value="ja" checked={formData.einkommensAbweichung === 'ja'} onChange={() => handleRadioChange('einkommensAbweichung', 'ja')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="einkommensAbweichung" value="nein" checked={formData.einkommensAbweichung === 'nein'} onChange={() => handleRadioChange('einkommensAbweichung', 'nein')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            <h2 className="section-title">Berufliche Nebentätigkeiten</h2>

            <div className="form-group">
                <label className="form-label">Haben Sie berufliche Nebentätigkeiten?</label>
                <div className="radio-options">
                    <label className="radio-container">
                        <input type="radio" name="nebentaetigkeiten" value="ja" checked={formData.nebentaetigkeiten === 'ja'} onChange={() => handleRadioChange('nebentaetigkeiten', 'ja')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="nebentaetigkeiten" value="nein" checked={formData.nebentaetigkeiten === 'nein'} onChange={() => handleRadioChange('nebentaetigkeiten', 'nein')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            {formData.nebentaetigkeiten === 'ja' && (
                <>
                    <div className="form-group nebentaetigkeiten-counter">
                        <label className="form-label">Anzahl beruflicher Nebentätigkeiten</label>
                        <div className="income-input-container">
                            <div className="counter-control">
                                <button type="button" className="counter-btn decrease" onClick={() => handleCounterChange('anzahlNebentaetigkeiten', 'decrease')} disabled={formData.anzahlNebentaetigkeiten <= 1}><span>-</span></button>
                                <span className="counter-value">{formData.anzahlNebentaetigkeiten}</span>
                                <button type="button" className="counter-btn increase" onClick={() => handleCounterChange('anzahlNebentaetigkeiten', 'increase')} disabled={formData.anzahlNebentaetigkeiten >= 3}><span>+</span></button>
                            </div>
                        </div>
                    </div>

                    {[...Array(formData.anzahlNebentaetigkeiten)].map((_, index) => (
                        <div className="nebentaetigkeit-details" key={`nebentaetigkeit-${index + 1}`}>
                            <h3 className="nebentaetigkeit-title">Ihre Nebentätigkeit {index + 1}</h3>
                            <div className="form-group">
                                <label className="form-label">Nettoeinkommen aus Nebentätigkeit</label>
                                <div className="income-input-container">
                                    <div className="income-input-wrapper">
                                        <input type="text" className="income-input" placeholder="z.B. 500" value={formData[`nebenEinkommen${index + 1}`] || ''} onChange={(e) => handleRadioChange(`nebenEinkommen${index + 1}`, e.target.value)} />
                                        <span className="income-currency">
                                            <FaEuroSign /> /Monat
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}

            <h2 className="section-title">Sonstiges Einkommen</h2>

            <div className="collapsible-info">
                <button type="button" className="collapsible-btn" onClick={() => toggleCollapsible('sonstiges')}>
                    Warum fragen wir das? <span className={`arrow-down ${!collapsibleState.sonstiges ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${collapsibleState.sonstiges ? 'collapsed' : ''}`}>
                    <p><strong>Weitere Einkommen verbessern Ihre Bonität</strong></p>
                    <p>Weiteres Einkommen kann Ihre Kreditwürdigkeit verbessern.</p>
                </div>
            </div>

            <div className={`form-group ${activeTooltip === 'kindergeld' ? 'has-active-tooltip' : ''}`}>
                <label className="form-label">
                    Anzahl kindergeldberechtigter Kinder
                    <FaInfoCircle
                        onClick={() => toggleTooltip('kindergeld')}
                        style={{
                            display: 'inline-block',
                            marginLeft: '5px',
                            position: 'relative',
                            top: '2px',
                            cursor: 'pointer',
                            color: 'var(--accent-color)'
                        }}
                    />
                </label>
                <div className="income-input-container">
                    <div className="counter-control">
                        <button type="button" className="counter-btn decrease" onClick={() => handleCounterChange('anzahlKinder', 'decrease')} disabled={formData.anzahlKinder <= 0}><span>-</span></button>
                        <span className="counter-value">{formData.anzahlKinder}</span>
                        <button type="button" className="counter-btn increase" onClick={() => handleCounterChange('anzahlKinder', 'increase')}><span>+</span></button>
                    </div>
                </div>
                {activeTooltip === 'kindergeld' && (
                    <div className="income-tooltip">
                        Geben Sie die Anzahl der Kinder an, für die Sie Kindergeld beziehen. Dies kann sich positiv auf Ihre Kreditwürdigkeit auswirken.
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Sonstige Einkünfte?</label>
                <div className="radio-options">
                    <label className="radio-container">
                        <input type="radio" name="sonstigeEinkuenfte" value="ja" checked={formData.sonstigeEinkuenfte === 'ja'} onChange={() => handleRadioChange('sonstigeEinkuenfte', 'ja')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="sonstigeEinkuenfte" value="nein" checked={formData.sonstigeEinkuenfte === 'nein'} onChange={() => handleRadioChange('sonstigeEinkuenfte', 'nein')} />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            {formData.sonstigeEinkuenfte === 'ja' && (
                <>
                    <div className="form-group">
                        <label className="form-label">Ehegattenunterhalt</label>
                        <div className="input-wrapper">
                            <input type="number" min="0" step="1" placeholder="0" value={formData.ehegattenunterhaltBetrag || ''} onChange={(e) => handleRadioChange('ehegattenunterhaltBetrag', e.target.value)} className="form-input" />
                            <span className="currency-symbol"><FaEuroSign /></span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Rente (netto)</label>
                        <div className="input-wrapper">
                            <input type="number" min="0" step="1" placeholder="0" value={formData.renteNetto || ''} onChange={(e) => handleRadioChange('renteNetto', e.target.value)} className="form-input" />
                            <span className="currency-symbol"><FaEuroSign /></span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Eingehender Kindesunterhalt</label>
                        <div className="input-wrapper">
                            <input type="number" min="0" step="1" placeholder="0" value={formData.kindesunterhaltEingehend || ''} onChange={(e) => handleRadioChange('kindesunterhaltEingehend', e.target.value)} className="form-input" />
                            <span className="currency-symbol"><FaEuroSign /></span>
                        </div>
                        <p className="form-info-text">
                            Falls gerichtlich festgelegt ist, dass Sie Unterhalt für Kinder erhalten, geben Sie bitte die Gesamtsumme dieser monatlichen Unterhaltseinkünfte an.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

IncomeStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleCounterChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
};

export default IncomeStep;

