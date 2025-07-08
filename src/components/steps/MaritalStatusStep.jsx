import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaUserFriends, FaHeartBroken, FaRing, FaHome, FaUsers } from 'react-icons/fa';

const MaritalStatusStep = ({ formData, handleRadioChange, animationClass }) => (
    <div className={`form-content ${animationClass}`}>
        <h1 className="form-title">Familienstand</h1>

        <div className="form-group">
            <label className="form-label">Familienstand</label>

            <div className="radio-options marital-options">
                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="ledig"
                        checked={formData.maritalStatus === 'ledig'}
                        onChange={() => handleRadioChange('maritalStatus', 'ledig')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaUser className="radio-icon" />
                        <span className="radio-text">Ledig</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="verheiratet"
                        checked={formData.maritalStatus === 'verheiratet'}
                        onChange={() => handleRadioChange('maritalStatus', 'verheiratet')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaRing className="radio-icon" />
                        <span className="radio-text">Verheiratet</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="verwitwet"
                        checked={formData.maritalStatus === 'verwitwet'}
                        onChange={() => handleRadioChange('maritalStatus', 'verwitwet')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaHeartBroken className="radio-icon" />
                        <span className="radio-text">Verwitwet</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="geschieden"
                        checked={formData.maritalStatus === 'geschieden'}
                        onChange={() => handleRadioChange('maritalStatus', 'geschieden')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaHeartBroken className="radio-icon" />
                        <span className="radio-text">Geschieden</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="eheähnliche Lebensgemeinschaft"
                        checked={formData.maritalStatus === 'eheähnliche Lebensgemeinschaft'}
                        onChange={() => handleRadioChange('maritalStatus', 'eheähnliche Lebensgemeinschaft')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaHome className="radio-icon" />
                        <span className="radio-text">Eheähnliche Lebensgemeinschaft</span>
                    </div>
                </label>

                <label className="radio-container">
                    <input
                        type="radio"
                        name="maritalStatus"
                        value="getrennt lebend"
                        checked={formData.maritalStatus === 'getrennt lebend'}
                        onChange={() => handleRadioChange('maritalStatus', 'getrennt lebend')}
                    />
                    <span className="radio-checkmark"></span>
                    <div className="radio-content">
                        <FaUsers className="radio-icon" />
                        <span className="radio-text">Getrennt lebend</span>
                    </div>
                </label>
            </div>
        </div>
    </div>
);

MaritalStatusStep.propTypes = {
    formData: PropTypes.object.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    animationClass: PropTypes.string.isRequired,
};

export default MaritalStatusStep;
