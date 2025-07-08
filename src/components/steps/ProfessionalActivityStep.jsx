import React from 'react';

const ProfessionalActivityStep = ({
    formData,
    handleRadioChange,
    animationClass,
    toggleCollapsible,
    infoCollapsed,
    activeTooltip,
    toggleTooltip
}) => {
    return (
        <div className={`form-content ${animationClass}`}>
            <h1 className="form-title" style={{ color: 'white' }}>Berufliche Tätigkeit</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('beruflich')}
                    style={{ color: 'white' }}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p style={{ color: 'white' }}><strong>Ihre berufliche Tätigkeit ist für Ihre Bonität wichtig</strong></p>
                    <p style={{ color: 'white' }}>Die Angaben zu Ihrer beruflichen Situation und zu Ihrem Arbeitsverhältnis sind für die Kreditvergabe sehr wichtig. Diese Informationen werden bei der Berechnung Ihrer Kreditwürdigkeit berücksichtigt.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Firma/Arbeitgeber</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. Musterfirma GmbH"
                        value={formData.firmaArbeitgeber || ''}
                        onChange={(e) => handleRadioChange('firmaArbeitgeber', e.target.value)}
                        className="form-input"
                    />
                </div>
                <p className="form-info-text" style={{ color: 'white' }}>
                    Die Angabe eines Arbeitgebers ist für die finanzielle Einschätzung, zur Anstellungsart und damit für eine Prüfung Ihrer Kreditwürdigkeit notwendig.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Land Arbeitgeber</label>
                <div className="select-wrapper" style={{ maxWidth: '250px' }}>
                    <select
                        value={formData.landArbeitgeber || 'Deutschland'}
                        onChange={(e) => handleRadioChange('landArbeitgeber', e.target.value)}
                        className="form-select"
                    >
                        <option value="Deutschland">Deutschland</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                        <option value="Andere">Andere</option>
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Straße und Hausnummer Arbeitgeber</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder=""
                        value={formData.strasseArbeitgeber || ''}
                        onChange={(e) => handleRadioChange('strasseArbeitgeber', e.target.value)}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>PLZ Arbeitgeber</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder=""
                        value={formData.plzArbeitgeber || ''}
                        onChange={(e) => handleRadioChange('plzArbeitgeber', e.target.value)}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Ort Arbeitgeber</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder=""
                        value={formData.ortArbeitgeber || ''}
                        onChange={(e) => handleRadioChange('ortArbeitgeber', e.target.value)}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Branche</label>
                <div className="select-wrapper" style={{ maxWidth: '250px' }}>
                    <select
                        value={formData.branche || ''}
                        onChange={(e) => handleRadioChange('branche', e.target.value)}
                        className="form-select"
                    >
                        <option value="">Bitte auswählen</option>
                        <option value="Baugewerbe">Baugewerbe</option>
                        <option value="Dienstleistung">Dienstleistung</option>
                        <option value="Einzelhandel">Einzelhandel</option>
                        <option value="Gesundheit">Gesundheit</option>
                        <option value="Industrie">Industrie</option>
                        <option value="IT und Kommunikation">IT und Kommunikation</option>
                        <option value="Öffentlicher Dienst">Öffentlicher Dienst</option>
                        <option value="Andere">Andere</option>
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
            </div>

            <div className={`form-group ${activeTooltip === 'beschaeftigung' ? 'has-active-tooltip' : ''}`}>
                <label className="form-label" style={{ color: 'white' }}>Beschäftigung</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder=""
                        value={formData.beschaeftigung || ''}
                        onChange={(e) => handleRadioChange('beschaeftigung', e.target.value)}
                        className="form-input"
                    />
                    <div
                        className="income-info-icon"
                        onClick={() => toggleTooltip('beschaeftigung')}
                        style={{ position: 'absolute', right: '-40px', top: '8px' }}
                    >
                        <span>i</span>
                    </div>
                </div>
                {activeTooltip === 'beschaeftigung' && (
                    <div className="income-tooltip" style={{ color: 'white' }}>
                        Bitte geben Sie hier Ihre genaue Berufsbezeichnung an.
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Arbeitszeit in Teilzeit?</label>
                <div className="select-wrapper" style={{ maxWidth: '250px' }}>
                    <select
                        value={formData.arbeitszeitTeilzeit || 'Vollzeit'}
                        onChange={(e) => handleRadioChange('arbeitszeitTeilzeit', e.target.value)}
                        className="form-select"
                    >
                        <option value="Vollzeit">Vollzeit</option>
                        <option value="Teilzeit">Teilzeit</option>
                        <option value="Geringfügig">Geringfügig</option>
                    </select>
                    <span className="select-arrow">▼</span>
                </div>
                <p className="form-info-text" style={{ color: 'white' }}>
                    Bitte geben Sie hier an, wenn Sie aktuell in Kurzarbeit sind. Diese Umstellung könnte einen Einfluss auf die Kreditvergabe haben.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Ist Ihr Arbeitsverhältnis befristet?</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="arbeitsverhaltnisBefristet"
                            value="ja"
                            checked={formData.arbeitsverhaltnisBefristet === 'ja'}
                            onChange={() => handleRadioChange('arbeitsverhaltnisBefristet', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text" style={{ color: 'white' }}>Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="arbeitsverhaltnisBefristet"
                            value="nein"
                            checked={formData.arbeitsverhaltnisBefristet === 'nein'}
                            onChange={() => handleRadioChange('arbeitsverhaltnisBefristet', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text" style={{ color: 'white' }}>Nein</span>
                    </label>
                </div>
                {formData.arbeitsverhaltnisBefristet === 'ja' && (
                    <p className="form-info-text" style={{ color: 'white' }}>
                        Handelt es sich bei Ihrem Arbeitsverhältnis um einen befristeten Arbeitsvertrag oder einen unbefristeten Arbeitsvertrag? Bei einer Befristung werden weitere Informationen benötigt.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ProfessionalActivityStep;
