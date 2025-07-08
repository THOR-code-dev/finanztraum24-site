import React from 'react';

const PersonalDataStep = ({
    formData,
    handleRadioChange,
    toggleFieldInfo,
    activeFieldInfo,
    warumInfoCollapsed,
    toggleWarumInfo,
    animationClass
}) => {
    const countryOptions = [
        <option key="de" value="Deutschland">Deutschland</option>,
        <option key="pl" value="Polen">Polen</option>,
        <option key="ro" value="Rumänien">Rumänien</option>,
        <option key="tr" value="Türkei">Türkei</option>,
        <option key="at" value="Österreich">Österreich</option>,
        <option key="ch" value="Schweiz">Schweiz</option>,
        <option key="fr" value="Frankreich">Frankreich</option>,
        <option key="it" value="Italien">Italien</option>,
        <option key="disabled" disabled>-------</option>,
        <option key="af" value="Afghanistan">Afghanistan</option>,
        <option key="eg" value="Ägypten">Ägypten</option>,
        <option key="al" value="Albanien">Albanien</option>,
    ];

    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title">Persönliche Daten</h1>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                    src="https://cdn.finanzcheck.de/assets/img/schufa-neutral-icon.svg"
                    alt="100% SCHUFA Neutral"
                    style={{ width: '60px', height: 'auto' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div className="accordion-section" style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '5px',
                    padding: '15px',
                    marginBottom: '20px',
                    backgroundColor: 'rgba(240, 248, 255, 0.1)',
                    cursor: 'pointer'
                }} onClick={toggleWarumInfo}>
                    <div className="accordion-header" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="accordion-icon" style={{ marginRight: '10px', color: '#F2CD83', transform: warumInfoCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
                            ▼
                        </div>
                        <span style={{ color: '#F2CD83', fontWeight: '500' }}>Warum fragen wir das?</span>
                    </div>

                    {!warumInfoCollapsed && (
                        <div className="accordion-content" style={{
                            marginTop: '15px',
                            padding: '15px',
                            backgroundColor: 'rgba(242, 205, 131, 0.1)',
                            borderRadius: '5px',
                            color: '#F2CD83'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#F2CD83' }}>
                                Kreditinstitute müssen Ihre Identität prüfen
                            </h4>
                            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#FFFFFF' }}>
                                Kreditinstitute sind durch § 10 Absatz 1 GwG verpflichtet, Angaben zur Person des Kreditnehmers zu erheben und dessen Identität zu überprüfen. Ihr Vorteil: Alle Angaben sind 100% Schufaneutral und haben keine Auswirkungen auf Ihren Schufa-Score.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Geburtsdatum</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input
                            type="text"
                            placeholder="TT.MM.JJJJ"
                            value={formData.geburtsdatum}
                            onChange={(e) => handleRadioChange('geburtsdatum', e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div
                        style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: '#aab6c0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => toggleFieldInfo('geburtsdatum')}
                    >
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                    </div>
                </div>
                {activeFieldInfo === 'geburtsdatum' && (
                    <div style={{
                        marginTop: '10px',
                        padding: '15px',
                        backgroundColor: 'rgba(242, 205, 131, 0.1)',
                        borderRadius: '5px',
                        color: '#F2CD83',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        <p style={{ margin: 0 }}>
                            <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                        </p>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">Geburtsort</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type="text"
                        placeholder="z.B. Musterstadt"
                        value={formData.geburtsort}
                        onChange={(e) => handleRadioChange('geburtsort', e.target.value)}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Geburtsland</label>
                <div className="select-wrapper">
                    <select
                        value={formData.geburtsland}
                        onChange={(e) => handleRadioChange('geburtsland', e.target.value)}
                        className="form-select"
                    >
                        {countryOptions}
                    </select>
                    <div className="select-arrow">▼</div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Staatsangehörigkeit</label>
                <div className="select-wrapper">
                    <select
                        value={formData.staatsangehoerigkeit}
                        onChange={(e) => handleRadioChange('staatsangehoerigkeit', e.target.value)}
                        className="form-select"
                    >
                        {countryOptions}
                    </select>
                    <div className="select-arrow">▼</div>
                </div>
            </div>

            {activeFieldInfo === 'staatsangehoerigkeit' && (
                <div style={{
                    marginTop: '10px',
                    padding: '15px',
                    backgroundColor: 'rgba(242, 205, 131, 0.1)',
                    borderRadius: '5px',
                    color: '#F2CD83',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    <p style={{ margin: 0 }}>
                        <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                    </p>
                </div>
            )}

            {formData.staatsangehoerigkeit !== 'Deutschland' && (
                <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '5px', backgroundColor: 'rgba(240, 248, 255, 0.1)' }}>
                    <h3 style={{ color: '#F2CD83', textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>
                        Genehmigungen bei ausländischen Bürgern
                    </h3>

                    <div className="form-group">
                        <label className="form-label">In Deutschland lebend seit</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="MM.JJJJ"
                                value={formData.inDeutschlandSeit}
                                onChange={(e) => handleRadioChange('inDeutschlandSeit', e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Aufenthaltsgenehmigung befristet?</label>
                        <div className="radio-options">
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="aufenthaltBefristet"
                                    value="ja"
                                    checked={formData.aufenthaltBefristet === 'ja'}
                                    onChange={() => handleRadioChange('aufenthaltBefristet', 'ja')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Ja</span>
                            </label>
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="aufenthaltBefristet"
                                    value="nein"
                                    checked={formData.aufenthaltBefristet === 'nein'}
                                    onChange={() => handleRadioChange('aufenthaltBefristet', 'nein')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Nein</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalDataStep;
