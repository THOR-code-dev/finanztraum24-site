import React from 'react';

const AddressStep = ({
    formData,
    handleRadioChange,
    animationClass,
    warumInfoCollapsed,
    toggleWarumInfo
}) => {
    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title">Adresse</h1>

            <div className="form-collapsible" onClick={toggleWarumInfo} style={{ cursor: 'pointer', marginBottom: '20px', backgroundColor: 'rgba(240, 248, 255, 0.1)', padding: '10px 15px', borderRadius: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#F2CD83', fontWeight: '500' }}>Warum fragen wir das?</span>
                    <span style={{ color: '#F2CD83', transform: warumInfoCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>▼</span>
                </div>

                {!warumInfoCollapsed && (
                    <div style={{
                        marginTop: '15px',
                        padding: '15px',
                        backgroundColor: 'rgba(242, 205, 131, 0.1)',
                        borderRadius: '5px',
                        color: '#F2CD83'
                    }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#F2CD83' }}>
                            Ihre Adressdaten sind für den Kreditantrag erforderlich
                        </h4>
                        <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#FFFFFF' }}>
                            Für den Kreditantrag benötigen wir Ihre aktuelle Adresse. Diese wird für die Identitätsprüfung und zur Kommunikation mit Ihnen verwendet.
                        </p>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Wohnland</label>
                <div className="select-wrapper">
                    <select
                        value={formData.wohnland}
                        onChange={(e) => handleRadioChange('wohnland', e.target.value)}
                        className="form-select"
                    >
                        <option value="Deutschland">Deutschland</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Straße und Hausnummer</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. Musterstraße 123"
                        value={formData.strasse}
                        onChange={(e) => handleRadioChange('strasse', e.target.value)}
                        className="form-input"
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.strasse ? 'none' : 'block' }}>
                    Bitte geben Sie Ihre Straße und Hausnummer an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Postleitzahl</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. 12345"
                        value={formData.plz}
                        onChange={(e) => handleRadioChange('plz', e.target.value)}
                        className="form-input"
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.plz ? 'none' : 'block' }}>
                    Bitte geben Sie Ihre Postleitzahl an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Wohnort</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. Berlin"
                        value={formData.wohnort}
                        onChange={(e) => handleRadioChange('wohnort', e.target.value)}
                        className="form-input"
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.wohnort ? 'none' : 'block' }}>
                    Bitte geben Sie Ihren Wohnort an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Wohnhaft seit</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="MM/JJJJ"
                        value={formData.wohnhaftSeit}
                        onChange={(e) => handleRadioChange('wohnhaftSeit', e.target.value)}
                        className="form-input"
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.wohnhaftSeit ? 'none' : 'block' }}>
                    Bitte geben Sie an, seit wann Sie an dieser Adresse wohnhaft sind.
                </div>
            </div>
        </div>
    );
};

export default AddressStep;
