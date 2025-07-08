import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PeopleFigures from '../ui/PeopleFigures';
import { FaUsers, FaHome, FaChild } from 'react-icons/fa';

const HouseholdStep = ({ formData, handleCounterChange, handleRadioChange, animationClass }) => {
    const [infoCollapsed, setInfoCollapsed] = useState(true);

    const toggleCollapsible = () => {
        setInfoCollapsed(!infoCollapsed);
    };

    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title">Haushaltsführung</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={toggleCollapsible}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Wie Sie wohnen, beeinflusst Ihre Bonität</strong></p>
                    <p>Ihre Wohnsituation wird bei der Kreditprüfung berücksichtigt. Dabei kann relevant sein, mit wie vielen Personen Sie zusammenleben und ob Sie zur Miete oder im Eigenheim wohnen.</p>
                    <p>So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Anzahl Erwachsene im Haushalt</label>
                <p className="form-sublabel">ab 18 - 99+ Jahre</p>

                <div className="counter-control">
                    <button
                        type="button"
                        className="counter-btn decrease"
                        onClick={() => handleCounterChange('adults', 'decrease')}
                        disabled={formData.adults <= 1}
                    >
                        <span>-</span>
                    </button>
                    <span className="counter-value">{formData.adults}</span>
                    <button
                        type="button"
                        className="counter-btn increase"
                        onClick={() => handleCounterChange('adults', 'increase')}
                        disabled={formData.adults + formData.children >= 10}
                    >
                        <span>+</span>
                    </button>
                </div>

                <PeopleFigures count={formData.adults} type="adults" />
            </div>

            <div className="form-group">
                <label className="form-label">Anzahl Kinder im Haushalt</label>
                <p className="form-sublabel">0 - unter 18 Jahre</p>

                <div className="counter-control">
                    <button
                        type="button"
                        className="counter-btn decrease"
                        onClick={() => handleCounterChange('children', 'decrease')}
                        disabled={formData.children <= 0}
                    >
                        <span>-</span>
                    </button>
                    <span className="counter-value">{formData.children}</span>
                    <button
                        type="button"
                        className="counter-btn increase"
                        onClick={() => handleCounterChange('children', 'increase')}
                        disabled={formData.adults + formData.children >= 10}
                    >
                        <span>+</span>
                    </button>
                </div>

                <PeopleFigures count={formData.children} type="children" />
            </div>

            <div className="form-group">
                <label className="form-label">Wohnsituation</label>

                <div className="housing-options">
                    <div className="housing-option">
                        <input
                            type="radio"
                            id="housing-miet"
                            name="housingStatus"
                            value="zur Miete"
                            checked={formData.housingStatus === 'zur Miete'}
                            onChange={() => handleRadioChange('housingStatus', 'zur Miete')}
                        />
                        <label htmlFor="housing-miet">
                            <span className="radio-dot"></span>
                            <FaHome style={{ marginRight: '10px', color: '#F2CD83' }} /> zur Miete
                        </label>
                    </div>

                    <div className="housing-option">
                        <input
                            type="radio"
                            id="housing-mietfrei"
                            name="housingStatus"
                            value="mietfrei"
                            checked={formData.housingStatus === 'mietfrei'}
                            onChange={() => handleRadioChange('housingStatus', 'mietfrei')}
                        />
                        <label htmlFor="housing-mietfrei">
                            <span className="radio-dot"></span>
                            <FaHome style={{ marginRight: '10px', color: '#F2CD83' }} /> mietfrei
                        </label>
                    </div>

                    <div className="housing-option">
                        <input
                            type="radio"
                            id="housing-eltern"
                            name="housingStatus"
                            value="bei den Eltern"
                            checked={formData.housingStatus === 'bei den Eltern'}
                            onChange={() => handleRadioChange('housingStatus', 'bei den Eltern')}
                        />
                        <label htmlFor="housing-eltern">
                            <span className="radio-dot"></span>
                            <FaUsers style={{ marginRight: '10px', color: '#F2CD83' }} /> bei den Eltern
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

HouseholdStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleCounterChange: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
};

export default HouseholdStep;
