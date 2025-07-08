import React from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaBuilding, FaCity, FaStore } from 'react-icons/fa';

const ImmobilienStep = ({ formData, handleRadioChange, animationClass }) => {
    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title" style={{ color: '#F2CD83', display: 'block', width: '100%' }}>Selbstgenutzte Immobilie</h1>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white', display: 'block' }}>Welche Art von Immobilie besitzen Sie?</label>

                <div className="radio-options immobilie-options">
                    <label className="radio-container immobilie-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="eigentumswohnung"
                            checked={formData.immobilieArt === 'eigentumswohnung'}
                            onChange={() => handleRadioChange('immobilieArt', 'eigentumswohnung')}
                        />
                        <span className="radio-checkmark"></span>
                        <div className="radio-content">
                            <FaHome className="radio-icon" style={{ color: '#F2CD83' }} />
                            <span className="radio-text">Eigentumswohnung</span>
                        </div>
                    </label>

                    <label className="radio-container immobilie-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="einfamilienhaus"
                            checked={formData.immobilieArt === 'einfamilienhaus'}
                            onChange={() => handleRadioChange('immobilieArt', 'einfamilienhaus')}
                        />
                        <span className="radio-checkmark"></span>
                        <div className="radio-content">
                            <FaHome className="radio-icon" style={{ color: '#F2CD83' }} />
                            <span className="radio-text">Einfamilienhaus</span>
                        </div>
                    </label>

                    <label className="radio-container immobilie-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="mehrfamilienhaus"
                            checked={formData.immobilieArt === 'mehrfamilienhaus'}
                            onChange={() => handleRadioChange('immobilieArt', 'mehrfamilienhaus')}
                        />
                        <span className="radio-checkmark"></span>
                        <div className="radio-content">
                            <FaBuilding className="radio-icon" style={{ color: '#F2CD83' }} />
                            <span className="radio-text">Mehrfamilienhaus</span>
                        </div>
                    </label>

                    <label className="radio-container immobilie-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="bürogeschäftsgebäude"
                            checked={formData.immobilieArt === 'bürogeschäftsgebäude'}
                            onChange={() => handleRadioChange('immobilieArt', 'bürogeschäftsgebäude')}
                        />
                        <span className="radio-checkmark"></span>
                        <div className="radio-content">
                            <FaStore className="radio-icon" style={{ color: '#F2CD83' }} />
                            <span className="radio-text">Büro-/Geschäftsgebäude</span>
                        </div>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white', display: 'block' }}>Fläche selbstgenutzte Immobilie</label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="z.B. 120"
                        value={formData.immobilieFlaeche || ''}
                        onChange={(e) => handleRadioChange('immobilieFlaeche', e.target.value)}
                        className="form-input"
                    />
                    <span className="unit-symbol">qm</span>
                </div>
            </div>

            <h1 className="form-title" style={{ color: '#F2CD83', display: 'block', width: '100%', marginTop: '40px' }}>Vermietete Immobilie</h1>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white', display: 'block' }}>Besitzen Sie Wohneigentum, das Sie vermieten?</label>

                <div className="radio-options rental-property-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="hasRentalProperty"
                            value="ja"
                            checked={formData.hasRentalProperty === 'ja'}
                            onChange={() => handleRadioChange('hasRentalProperty', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="hasRentalProperty"
                            value="nein"
                            checked={formData.hasRentalProperty === 'nein'}
                            onChange={() => handleRadioChange('hasRentalProperty', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            {formData.hasRentalProperty === 'ja' && (
                <>
                    <div className="form-group">
                        <label className="form-label" style={{ color: 'white', display: 'block' }}>Welche Art von Immobilie vermieten Sie?</label>

                        <div className="radio-options immobilie-options">
                            <label className="radio-container immobilie-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="eigentumswohnung"
                                    checked={formData.vermieteteImmobilieArt === 'eigentumswohnung'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'eigentumswohnung')}
                                />
                                <span className="radio-checkmark"></span>
                                <div className="radio-content">
                                    <FaHome className="radio-icon" style={{ color: '#F2CD83' }} />
                                    <span className="radio-text">Eigentumswohnung</span>
                                </div>
                            </label>

                            <label className="radio-container immobilie-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="einfamilienhaus"
                                    checked={formData.vermieteteImmobilieArt === 'einfamilienhaus'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'einfamilienhaus')}
                                />
                                <span className="radio-checkmark"></span>
                                <div className="radio-content">
                                    <FaHome className="radio-icon" style={{ color: '#F2CD83' }} />
                                    <span className="radio-text">Einfamilienhaus</span>
                                </div>
                            </label>

                            <label className="radio-container immobilie-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="mehrfamilienhaus"
                                    checked={formData.vermieteteImmobilieArt === 'mehrfamilienhaus'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'mehrfamilienhaus')}
                                />
                                <span className="radio-checkmark"></span>
                                <div className="radio-content">
                                    <FaBuilding className="radio-icon" style={{ color: '#F2CD83' }} />
                                    <span className="radio-text">Mehrfamilienhaus</span>
                                </div>
                            </label>

                            <label className="radio-container immobilie-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="bürogeschäftsgebäude"
                                    checked={formData.vermieteteImmobilieArt === 'bürogeschäftsgebäude'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'bürogeschäftsgebäude')}
                                />
                                <span className="radio-checkmark"></span>
                                <div className="radio-content">
                                    <FaStore className="radio-icon" style={{ color: '#F2CD83' }} />
                                    <span className="radio-text">Büro-/Geschäftsgebäude</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <h3 className="form-sublabel" style={{ color: '#F2CD83', display: 'block', width: '100%', fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Fläche vermietete Immobilie</h3>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="z.B. 120"
                                value={formData.vermieteteImmobilieFlaeche || ''}
                                onChange={(e) => handleRadioChange('vermieteteImmobilieFlaeche', e.target.value)}
                                className="form-input"
                            />
                            <span className="unit-symbol">qm</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

ImmobilienStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
};

export default ImmobilienStep;
