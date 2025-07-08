import React from 'react';

const InsuranceStep = ({ formData, handleRadioChange, warumInsuranceInfoCollapsed, toggleWarumInsuranceInfo }) => {
    return (
        <>
            <h2 className="form-title">Ratenschutzversicherung</h2>

            <div className="collapsible-info warum-fragen-wir-das">
                <button
                    type="button"
                    className={`collapsible-btn ${warumInsuranceInfoCollapsed ? '' : 'active'}`}
                    onClick={toggleWarumInsuranceInfo}
                >
                    Warum fragen wir das?
                    <span className={`arrow-down ${warumInsuranceInfoCollapsed ? '' : 'rotated'}`}></span>
                </button>
                <div className={`collapsible-content ${warumInsuranceInfoCollapsed ? 'collapsed' : ''}`}>
                    <p>Mit einer Ratenschutzversicherung können Sie sich und Ihre Familie vor finanziellen Engpässen schützen, falls Sie unerwartet arbeitslos oder arbeitsunfähig werden oder im Todesfall.</p>
                    <p>Die Angabe ist freiwillig und hat keinen Einfluss auf die Kreditentscheidung.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label insurance-question">Wünschen Sie eine Ratenschutzversicherung?</label>
                <div className="radio-options vertical">
                    {['Komplettschutz', 'Standardschutz', 'Todesfallschutz', 'Kein Schutz'].map((option) => {
                        const details = {
                            'Komplettschutz': { price: '12,73€', description: 'Im Fall von Arbeitslosigkeit, Arbeitsunfähigkeit oder Tod' },
                            'Standardschutz': { price: '12,32€', description: 'Im Fall von Arbeitsunfähigkeit oder Tod' },
                            'Todesfallschutz': { price: '4,87€', description: 'Nur im Todesfall' },
                            'Kein Schutz': { price: null, description: 'Ich trage alle Risiken selbst' }
                        };
                        const valueMap = {
                            'Komplettschutz': 'komplett',
                            'Standardschutz': 'standard',
                            'Todesfallschutz': 'tod',
                            'Kein Schutz': 'kein'
                        };
                        const currentValue = valueMap[option];

                        return (
                            <label key={currentValue} className="radio-simple-container insurance-option">
                                <input
                                    type="radio"
                                    name="paymentProtectionInsurance"
                                    value={currentValue}
                                    checked={formData.paymentProtectionInsurance === currentValue}
                                    onChange={(e) => handleRadioChange('paymentProtectionInsurance', e.target.value)}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">
                                    <span className="insurance-option-title">
                                        {option} {details[option].price ? `(ab mtl. ${details[option].price}*)` : ''}
                                    </span>
                                    <span className="insurance-option-description">
                                        {details[option].description}
                                    </span>
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
            <p className="form-hint insurance-hint">
                * Unverbindliches Rechenbeispiel. Die Höhe des Versicherungsbeitrags ist abhängig vom abgesicherten Kredit.
            </p>
        </>
    );
};

export default InsuranceStep;
