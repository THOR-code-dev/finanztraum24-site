import React from 'react';

// Kredi türü seçenekleri
const creditTypeOptions = [
    { value: 'Konsumentenkredit', label: 'Konsumentenkredit' },
    { value: 'Autokredit', label: 'Autokredit' },
    { value: 'Ratenkredit', label: 'Ratenkredit' },
    { value: 'Privatkredit', label: 'Privatkredit' },
    { value: 'Dispokredit', label: 'Dispokredit' },
    { value: 'Leasing', label: 'Leasing' },
];

// Kredi süresi seçenekleri
const creditDurationOptions = [
    { value: '12', label: '12 Monate' },
    { value: '24', label: '24 Monate' },
    { value: '36', label: '36 Monate' },
    { value: '48', label: '48 Monate' },
    { value: '60', label: '60 Monate' },
    { value: '72', label: '72 Monate' },
    { value: '84', label: '84 Monate' },
    { value: '96', label: '96 Monate' },
    { value: '120', label: '120 Monate' },
];

const ExistingCreditsStep = ({
    formData,
    animationClass,
    handleCounterChange,
    handleCreditDetailChange,
    handleRadioChange,
    toggleTooltip,
    activeTooltip
}) => {
    return (
        <div className={`form-content ${animationClass}`}>
            <h2 className="form-title">Bestehende Kredite</h2>

            <div className="counter-section">
                <div className="credit-counter-container">
                    <button
                        className="counter-btn decrease"
                        onClick={() => handleCounterChange('existingCredits', 'decrease')}
                        disabled={formData.existingCredits <= 0}
                    >
                        −
                    </button>
                    <div className="counter-value">{formData.existingCredits}</div>
                    <button
                        className="counter-btn increase"
                        onClick={() => handleCounterChange('existingCredits', 'increase')}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="form-info-box">
                <p className="form-info-text">
                    Wichtig: Baufinanzierungen zählen hier NICHT dazu. Bitte geben Sie hier vorhandene Ratenkredite, Dispos, Leasing und Rahmenkredite an.
                </p>
            </div>

            {/* Kredi detayları */}
            {Array.from({ length: formData.existingCredits }).map((_, index) => (
                <div key={index} className="credit-detail-form">
                    <h3 className="credit-detail-title">Bestehender Kredit {index + 1}</h3>

                    <div className="form-group">
                        <label>Kreditart</label>
                        <div className="select-wrapper">
                            <select
                                value={formData.creditDetails[index]?.creditType || ''}
                                onChange={(e) => handleCreditDetailChange(index, 'creditType', e.target.value)}
                                className="form-select"
                            >
                                <option value="" disabled>Bitte wählen</option>
                                {creditTypeOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ursprünglicher Kreditbetrag</label>
                        <div className="input-with-currency">
                            <input
                                type="text"
                                value={formData.creditDetails[index]?.originalAmount || ''}
                                onChange={(e) => handleCreditDetailChange(index, 'originalAmount', e.target.value)}
                                className="form-input"
                                placeholder="Ursprünglicher Kreditbetrag"
                            />
                            <span className="currency-symbol">€</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Monatliche Rate</label>
                        <div className="input-with-currency">
                            <input
                                type="text"
                                value={formData.creditDetails[index]?.monthlyRate || ''}
                                onChange={(e) => handleCreditDetailChange(index, 'monthlyRate', e.target.value)}
                                className="form-input"
                                placeholder="Monatliche Rate"
                            />
                            <span className="currency-symbol">€</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Kreditbeginn</label>
                        <input
                            type="text"
                            value={formData.creditDetails[index]?.startDate || ''}
                            onChange={(e) => handleCreditDetailChange(index, 'startDate', e.target.value)}
                            className="form-input"
                            placeholder="MM.JJJJ"
                        />
                    </div>

                    <div className="form-group">
                        <label>Restlaufzeit bis</label>
                        <input
                            type="text"
                            value={formData.creditDetails[index]?.endDate || ''}
                            onChange={(e) => handleCreditDetailChange(index, 'endDate', e.target.value)}
                            className="form-input"
                            placeholder="MM.JJJJ"
                        />
                    </div>

                    <div className="form-group">
                        <label>Wollen Sie diesen Kredit umschulden?</label>
                        <div className="info-icon-container">
                            <div className="info-icon" onClick={() => toggleTooltip('refinance' + index)}>i</div>
                            {activeTooltip === 'refinance' + index && (
                                <div className="tooltip">
                                    Durch eine Umschuldung können Sie häufig Ihre Ausgaben senken. Das spart Ihnen Geld und verbessert Ihre Haushaltsrechnung – und damit Ihre Bonität. Deshalb vergeben Banken hier oft besonders günstige Zinssätze.
                                </div>
                            )}
                        </div>
                        <div className="radio-options">
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    checked={formData.creditDetails[index]?.wantToRefinance === 'ja'}
                                    onChange={() => handleCreditDetailChange(index, 'wantToRefinance', 'ja')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Ja</span>
                            </label>
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    checked={formData.creditDetails[index]?.wantToRefinance === 'nein'}
                                    onChange={() => handleCreditDetailChange(index, 'wantToRefinance', 'nein')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Nein</span>
                            </label>
                        </div>
                    </div>

                    {formData.creditDetails[index]?.wantToRefinance === 'ja' && (
                        <>
                            <div className="form-group">
                                <label>Geschätzte Restschuld</label>
                                <div className="input-with-currency">
                                    <input
                                        type="text"
                                        value={formData.creditDetails[index]?.estimatedRemainingDebt || ''}
                                        onChange={(e) => handleCreditDetailChange(index, 'estimatedRemainingDebt', e.target.value)}
                                        className="form-input"
                                        placeholder="Geschätzte Restschuld"
                                    />
                                    <span className="currency-symbol">€</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Angabe zur Bankverbindung (optional)</label>
                                <div className="radio-options">
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            checked={formData.creditDetails[index]?.bankConnection === 'IBAN'}
                                            onChange={() => handleCreditDetailChange(index, 'bankConnection', 'IBAN')}
                                        />
                                        <span className="radio-checkmark"></span>
                                        <span className="radio-text">IBAN</span>
                                    </label>
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            checked={formData.creditDetails[index]?.bankConnection === 'Konto-Nr. & BLZ'}
                                            onChange={() => handleCreditDetailChange(index, 'bankConnection', 'Konto-Nr. & BLZ')}
                                        />
                                        <span className="radio-checkmark"></span>
                                        <span className="radio-text">Konto-Nr. & BLZ</span>
                                    </label>
                                </div>
                            </div>

                            {formData.creditDetails[index]?.bankConnection === 'IBAN' && (
                                <div className="form-group">
                                    <label>IBAN</label>
                                    <input
                                        type="text"
                                        value={formData.creditDetails[index]?.iban || ''}
                                        onChange={(e) => handleCreditDetailChange(index, 'iban', e.target.value)}
                                        className="form-input"
                                        placeholder="IBAN"
                                    />
                                    <p className="form-hint">Ihre 22-stellige Kreditkontonummer finden Sie in Ihrem Online Banking/Ihrer Umsatzanzeige in der Detailansicht der abgebuchten Rate.</p>
                                </div>
                            )}

                            {formData.creditDetails[index]?.bankConnection === 'Konto-Nr. & BLZ' && (
                                <>
                                    <div className="form-group">
                                        <label>Land</label>
                                        <div className="radio-options">
                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    checked={formData.creditDetails[index]?.country === 'Deutschland' || !formData.creditDetails[index]?.country}
                                                    onChange={() => handleCreditDetailChange(index, 'country', 'Deutschland')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Deutschland</span>
                                            </label>
                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    checked={formData.creditDetails[index]?.country === 'Anderes Land'}
                                                    onChange={() => handleCreditDetailChange(index, 'country', 'Anderes Land')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Anderes Land</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Kontonummer des Kreditkontos</label>
                                        <input
                                            type="text"
                                            value={formData.creditDetails[index]?.accountNumber || ''}
                                            onChange={(e) => handleCreditDetailChange(index, 'accountNumber', e.target.value)}
                                            className="form-input"
                                            placeholder="Kontonummer des Kreditkontos"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Bankleitzahl des Kreditkontos</label>
                                        <input
                                            type="text"
                                            value={formData.creditDetails[index]?.bankCode || ''}
                                            onChange={(e) => handleCreditDetailChange(index, 'bankCode', e.target.value)}
                                            className="form-input"
                                            placeholder="Bankleitzahl des Kreditkontos"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}

            {/* Sabit kredi tutarı ayarlama bölümü - her zaman görünür */}
            {formData.existingCredits > 0 && (
                <div className="credit-amount-adjustment">
                    <h3 className="section-title">Kreditbetrag anpassen</h3>

                    <div className="radio-options">
                        <label className="radio-container">
                            <input
                                type="radio"
                                checked={formData.adjustCreditAmount === 'noAdjust'}
                                onChange={() => handleRadioChange('adjustCreditAmount', 'noAdjust')}
                            />
                            <span className="radio-checkmark"></span>
                            <div>
                                <span className="radio-text">20.000€</span>
                                <div className="radio-subtext">Kreditbetrag nicht anpassen</div>
                            </div>
                        </label>

                        <label className="radio-container">
                            <input
                                type="radio"
                                checked={formData.adjustCreditAmount === 'increase'}
                                onChange={() => handleRadioChange('adjustCreditAmount', 'increase')}
                            />
                            <span className="radio-checkmark"></span>
                            <div>
                                <span className="radio-text">20.000€</span>
                                <div className="radio-subtext">Ursprünglich ausgewählten Kreditbetrag um Restschuld der umzuschuldenden Kredite erhöhen</div>
                            </div>
                        </label>

                        <label className="radio-container">
                            <input
                                type="radio"
                                checked={formData.adjustCreditAmount === 'other'}
                                onChange={() => handleRadioChange('adjustCreditAmount', 'other')}
                            />
                            <span className="radio-checkmark"></span>
                            <div>
                                <span className="radio-text">Anderen Kreditbetrag angeben</span>
                            </div>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Kreditlaufzeit</label>
                        <div className="select-wrapper">
                            <select
                                value={formData.creditDuration}
                                onChange={(e) => handleRadioChange('creditDuration', e.target.value)}
                                className="form-select"
                            >
                                {creditDurationOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExistingCreditsStep;
