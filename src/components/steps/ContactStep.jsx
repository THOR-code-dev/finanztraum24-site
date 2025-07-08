import React from 'react';

const ContactStep = ({
    formData,
    handleRadioChange,
    toggleFieldInfo,
    activeFieldInfo,
    animationClass
}) => {
    return (
        <div className={`form-content ${animationClass}`} style={{ backgroundColor: '#00468c', padding: '30px', borderRadius: '10px' }}>
            <h1 className="form-title" style={{ color: 'white', textAlign: 'center' }}>Wie dürfen wir Sie ansprechen?</h1>
            <p style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
                Wir benötigen Ihre Kontaktdaten, um Ihnen die besten Kreditangebote zukommen zu lassen.
            </p>

            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Anrede</label>
                    <div className="radio-group" style={{ display: 'flex', gap: '10px' }}>
                        <label className={`radio-label ${formData.anrede === 'Herr' ? 'selected' : ''}`} style={{ flex: 1 }}>
                            <input
                                type="radio"
                                name="anrede"
                                value="Herr"
                                checked={formData.anrede === 'Herr'}
                                onChange={(e) => handleRadioChange('anrede', e.target.value)}
                            /> Herr
                        </label>
                        <label className={`radio-label ${formData.anrede === 'Frau' ? 'selected' : ''}`} style={{ flex: 1 }}>
                            <input
                                type="radio"
                                name="anrede"
                                value="Frau"
                                checked={formData.anrede === 'Frau'}
                                onChange={(e) => handleRadioChange('anrede', e.target.value)}
                            /> Frau
                        </label>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Vorname</label>
                        <input
                            type="text"
                            placeholder="Max"
                            value={formData.vorname}
                            onChange={(e) => handleRadioChange('vorname', e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Nachname</label>
                        <input
                            type="text"
                            placeholder="Mustermann"
                            value={formData.nachname}
                            onChange={(e) => handleRadioChange('nachname', e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Telefon</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="tel"
                                placeholder="0176 123 456 78"
                                value={formData.telefon}
                                onChange={(e) => handleRadioChange('telefon', e.target.value)}
                                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                            />
                        </div>
                        <div
                            style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#aab6c0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => toggleFieldInfo('telefon')}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                        </div>
                    </div>
                    {activeFieldInfo === 'telefon' && (
                        <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#e9f3fc', borderRadius: '5px', color: '#00468c', fontSize: '14px', lineHeight: '1.5' }}>
                            <p style={{ margin: 0 }}>
                                Die Telefonnummer wird für die Beratung und Unterstützung bei der Antragstellung verwendet.
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>E-Mail</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            placeholder="info@example.com"
                            value={formData.email}
                            onChange={(e) => handleRadioChange('email', e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className="checkbox-container" style={{ display: 'flex', alignItems: 'flex-start', color: '#fff', fontSize: '14px', lineHeight: '1.5' }}>
                        <input
                            type="checkbox"
                            checked={formData.datenschutz}
                            onChange={(e) => handleRadioChange('datenschutz', e.target.checked)}
                            style={{ marginRight: '10px', marginTop: '5px' }}
                        />
                        <span>Ich möchte neben den günstigen Kreditangeboten und Vermittlungsdienstleistungen auch attraktive Angebote der FINANZCHECK Kreditvermittlung und des Datenschutzhinweises und die Datenschutzerklärung zur Kenntnis genommen habe. Diese Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ContactStep;
