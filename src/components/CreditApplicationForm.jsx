import React, { useState, useEffect } from 'react';
import './CreditApplicationForm.css';

const CreditApplicationForm = () => {
    const [step, setStep] = useState(1);
    const [totalSteps] = useState(8);
    const [formData, setFormData] = useState({
        applicants: '1',
        maritalStatus: 'ledig',
        adults: 1,
        children: 0,
        housingStatus: 'zur Miete',
        hasRentalProperty: 'nein',
        warmMiete: '',
        privateKrankenversicherung: 'nein',
        ehegattenunterhalt: 'nein',
        kinderunterhalt: 'nein',
        hasCar: 'nein',
        kreditkarten: 'EC-Karte(n) und Kreditkarte(n)',
        berufsgruppe: 'Angestellte/r',
        nettoEinkommen: '',
        einkommensAbweichung: 'nein',
        nebentaetigkeiten: 'nein',
        anzahlNebentaetigkeiten: 1,
        nebenEinkommen: '',
        nebenEinkommenBefristet: 'nein',
        nebenBeschaeftigungsArt: 'Angestellten-/Arbeitertätigkeit',
        nebenBeschaeftigungSeit: '',
        nebenBeschaeftigungBefristet: 'nein',
        nebenBeschaeftigungProbezeit: 'nein',
        kindergeld: 'nein',
        anzahlKinder: 5,
        sonstigeEinkuenfte: 'nein'
    });
    const [animationDirection, setAnimationDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [infoCollapsed, setInfoCollapsed] = useState(false);
    const [warmMieteError, setWarmMieteError] = useState('');
    const [activeTooltip, setActiveTooltip] = useState(null);

    const handleRadioChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Warmmiete alanı için özel kontrol
        if (name === 'warmMiete') {
            if (value === '') {
                setWarmMieteError('Dieses Feld ist erforderlich.');
            } else if (parseFloat(value) > 30000) {
                setWarmMieteError('Der Betrag darf nicht mehr als 30.000 € betragen.');
            } else {
                setWarmMieteError('');
            }
        }
    };

    const handleCounterChange = (name, operation) => {
        setFormData(prev => {
            // Minimum değer kontrolü
            if (operation === 'decrease' && prev[name] <= 0) return prev;

            // Toplam kişi sayısı kontrolü
            let newValue = operation === 'increase' ? prev[name] + 1 : prev[name] - 1;
            const otherField = name === 'adults' ? 'children' : 'adults';

            // Toplam kişi sayısı 10'u geçemez
            if (operation === 'increase' && (newValue + prev[otherField] > 10)) {
                return prev;
            }

            return {
                ...prev,
                [name]: newValue
            };
        });
    };

    const goToNextStep = () => {
        if (isAnimating) return;

        // 5. adım için özel kontrol
        if (step === 5) {
            // Warmmiete değeri kontrol ediliyor
            if (formData.warmMiete === '') {
                setWarmMieteError('Dieses Feld ist erforderlich.');
                return;
            } else if (parseFloat(formData.warmMiete) > 30000) {
                setWarmMieteError('Der Betrag darf nicht mehr als 30.000 € betragen.');
                return;
            }
        }

        setAnimationDirection('next');
        setIsAnimating(true);

        // Kısa gecikme ekleyerek animasyonu gösteriyoruz
        setTimeout(() => {
            setStep(step + 1);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }, 300);
    };

    const goToPreviousStep = () => {
        if (isAnimating || step === 1) return;
        setAnimationDirection('prev');
        setIsAnimating(true);

        // Kısa gecikme ekleyerek animasyonu gösteriyoruz
        setTimeout(() => {
            setStep(step - 1);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }, 300);
    };

    // İlerleme çubuğu yüzdesini hesapla - Başlangıç %10, her adımda %5 artış
    const calculateProgress = () => {
        // İlk adım %10, her adım %5 ekler
        const basePercentage = 10;
        const stepPercentage = 5;
        const currentProgress = basePercentage + ((step - 1) * stepPercentage);

        // Minimum %10, maksimum %100 olacak şekilde sınırla
        return Math.min(Math.max(currentProgress, 10), 100);
    };

    // Form içeriğinin animasyon sınıfını belirle
    const getContentAnimationClass = () => {
        if (!animationDirection) return '';
        return animationDirection === 'next' ? 'slide-in-next' : 'slide-in-prev';
    };

    const toggleCollapsible = (id) => {
        setInfoCollapsed(!infoCollapsed);
    };

    const toggleTooltip = (id) => {
        if (activeTooltip === id) {
            setActiveTooltip(null);
        } else {
            setActiveTooltip(id);
        }
    };

    // Kişi figürlerini render et
    const renderPeopleFigures = (count, type) => {
        const figures = [];
        const figureClass = type === 'adults' ? 'adult-figure' : 'child-figure';

        for (let i = 0; i < count; i++) {
            figures.push(
                <div key={`${type}-${i}`} className={`person-figure ${figureClass}`}>
                    <svg viewBox="0 0 24 24" width="18" height="24">
                        <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                </div>
            );
        }

        return (
            <div className="figures-container">
                {figures}
            </div>
        );
    };

    const renderCreditApplicantsStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Ihr persönlicher Kreditvergleich</h1>

            <div className="certification-badge">
                <img src="https://via.placeholder.com/100x100?text=100%" alt="100% Schufa Neutral" />
            </div>

            <div className="form-info">
                <p>
                    Persönliche Angebote gibt es nur nach einer Prüfung der
                    Kreditwürdigkeit. Dafür benötigen wir Informationen zu Ihrer
                    Person und finanziellen Situation.
                </p>

                <p>
                    Nach Eingabe dieser Daten erhalten Sie von uns einen Überblick
                    über die besten für Sie verfügbaren Kreditangebote.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Anzahl Kreditnehmer</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="applicants"
                            value="1"
                            checked={formData.applicants === '1'}
                            onChange={() => handleRadioChange('applicants', '1')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">1 Kreditnehmer</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="applicants"
                            value="2"
                            checked={formData.applicants === '2'}
                            onChange={() => handleRadioChange('applicants', '2')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">2 Kreditnehmer</span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderMaritalStatusStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Familienstand</h1>

            <div className="form-group">
                <label className="form-label">Familienstand</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="maritalStatus"
                            value="ledig"
                            checked={formData.maritalStatus === 'ledig'}
                            onChange={() => handleRadioChange('maritalStatus', 'ledig')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">ledig</span>
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
                        <span className="radio-text">verheiratet</span>
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
                        <span className="radio-text">verwitwet</span>
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
                        <span className="radio-text">geschieden</span>
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
                        <span className="radio-text">eheähnliche Lebensgemeinschaft</span>
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
                        <span className="radio-text">getrennt lebend</span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderHouseholdStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Haushaltsführung</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('haushalt')}
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

                {renderPeopleFigures(formData.adults, 'adults')}
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

                {renderPeopleFigures(formData.children, 'children')}
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
                            zur Miete
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
                            mietfrei
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
                            bei den Eltern
                        </label>
                    </div>

                    <div className="housing-option">
                        <input
                            type="radio"
                            id="housing-eigentum"
                            name="housingStatus"
                            value="im Wohneigentum"
                            checked={formData.housingStatus === 'im Wohneigentum'}
                            onChange={() => handleRadioChange('housingStatus', 'im Wohneigentum')}
                        />
                        <label htmlFor="housing-eigentum">
                            <span className="radio-dot"></span>
                            im Wohneigentum
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderRentalPropertyStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Vermietete Immobilie</h1>

            <div className="form-group">
                <label className="form-label">Besitzen Sie Wohneigentum, das Sie vermieten?</label>

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
        </div>
    );

    const renderExpensesStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Ausgaben</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('ausgaben')}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Ausgaben können sich auch positiv auf Ihre Bonität auswirken</strong></p>
                    <p>Regelmäßige Ausgaben beeinflussen Ihre Bonität, denn sie schmälern Ihr verfügbares Einkommen. Dennoch stufen Banken Ausgaben für die Beurteilung Ihrer Kreditwürdigkeit unterschiedlich ein.</p>
                    <p>So wird das eigene Auto von einigen Banken als Zeichen dafür gewertet, dass Sie in der Lage sind, finanziell dafür aufzukommen. Und das wirkt sich durchaus positiv auf Ihre Bonität aus.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Warmmiete <span className="required-field">*</span></label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        min="0"
                        max="30000"
                        step="1"
                        placeholder="z.B. 2222"
                        value={formData.warmMiete}
                        onChange={(e) => handleRadioChange('warmMiete', e.target.value)}
                        required
                        className={warmMieteError ? 'input-error' : ''}
                    />
                    <span className="currency-symbol">€/Monat</span>
                </div>
                {warmMieteError && <p className="error-message">{warmMieteError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Sind Sie privat krankenversichert? (ohne Zusatzversicherungen)</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="privateKrankenversicherung"
                            value="ja"
                            checked={formData.privateKrankenversicherung === 'ja'}
                            onChange={() => handleRadioChange('privateKrankenversicherung', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="privateKrankenversicherung"
                            value="nein"
                            checked={formData.privateKrankenversicherung === 'nein'}
                            onChange={() => handleRadioChange('privateKrankenversicherung', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Zahlen Sie Ehegattenunterhalt?</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="ehegattenunterhalt"
                            value="ja"
                            checked={formData.ehegattenunterhalt === 'ja'}
                            onChange={() => handleRadioChange('ehegattenunterhalt', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="ehegattenunterhalt"
                            value="nein"
                            checked={formData.ehegattenunterhalt === 'nein'}
                            onChange={() => handleRadioChange('ehegattenunterhalt', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Zahlen Sie Kinderunterhalt?</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kinderunterhalt"
                            value="ja"
                            checked={formData.kinderunterhalt === 'ja'}
                            onChange={() => handleRadioChange('kinderunterhalt', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kinderunterhalt"
                            value="nein"
                            checked={formData.kinderunterhalt === 'nein'}
                            onChange={() => handleRadioChange('kinderunterhalt', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Besitzen Sie einen PKW?</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="hasCar"
                            value="ja"
                            checked={formData.hasCar === 'ja'}
                            onChange={() => handleRadioChange('hasCar', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="hasCar"
                            value="nein"
                            checked={formData.hasCar === 'nein'}
                            onChange={() => handleRadioChange('hasCar', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Besitzen Sie EC- oder Kreditkarten?</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kreditkarten"
                            value="keine"
                            checked={formData.kreditkarten === 'keine'}
                            onChange={() => handleRadioChange('kreditkarten', 'keine')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">keine</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kreditkarten"
                            value="EC-Karte(n)"
                            checked={formData.kreditkarten === 'EC-Karte(n)'}
                            onChange={() => handleRadioChange('kreditkarten', 'EC-Karte(n)')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">EC-Karte(n)</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kreditkarten"
                            value="Kreditkarte(n)"
                            checked={formData.kreditkarten === 'Kreditkarte(n)'}
                            onChange={() => handleRadioChange('kreditkarten', 'Kreditkarte(n)')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Kreditkarte(n)</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="kreditkarten"
                            value="EC-Karte(n) und Kreditkarte(n)"
                            checked={formData.kreditkarten === 'EC-Karte(n) und Kreditkarte(n)'}
                            onChange={() => handleRadioChange('kreditkarten', 'EC-Karte(n) und Kreditkarte(n)')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">EC-Karte(n) und Kreditkarte(n)</span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderIncomeStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Berufsgruppe</h1>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('berufsgruppe')}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Unterschiedliche Berufsgruppen erhalten unterschiedliche Zinsen</strong></p>
                    <p>Die Höhe des Zinssatzes, Vertragslaufzeit und Kreditsumme richten sich auch nach Ihrer Berufsgruppe.</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Berufsgruppe</label>
                <div className="select-wrapper">
                    <select
                        value={formData.berufsgruppe}
                        onChange={(e) => handleRadioChange('berufsgruppe', e.target.value)}
                        className="form-select"
                    >
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
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('einkommen')}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Banken mögen ein festes Einkommen</strong></p>
                    <p>Ihr Einkommen ist ein wichtiger Faktor bei der Berechnung Ihrer Kreditwürdigkeit.</p>
                </div>
            </div>

            <div className={`form-group ${activeTooltip === 'nettoeinkommen' ? 'has-active-tooltip' : ''}`}>
                <label className="form-label">Nettoeinkommen</label>
                <div className="income-input-container">
                    <div className="income-input-wrapper">
                        <input
                            type="text"
                            className="income-input"
                            placeholder="z.B. 2500"
                            value={formData.nettoEinkommen}
                            onChange={(e) => handleRadioChange('nettoEinkommen', e.target.value)}
                        />
                        <span className="income-currency">€/Monat</span>
                    </div>
                    <div
                        className="income-info-icon"
                        onClick={() => toggleTooltip('nettoeinkommen')}
                    >
                        <span>i</span>
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
                        <input
                            type="radio"
                            name="einkommensAbweichung"
                            value="ja"
                            checked={formData.einkommensAbweichung === 'ja'}
                            onChange={() => handleRadioChange('einkommensAbweichung', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="einkommensAbweichung"
                            value="nein"
                            checked={formData.einkommensAbweichung === 'nein'}
                            onChange={() => handleRadioChange('einkommensAbweichung', 'nein')}
                        />
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
                        <input
                            type="radio"
                            name="nebentaetigkeiten"
                            value="ja"
                            checked={formData.nebentaetigkeiten === 'ja'}
                            onChange={() => handleRadioChange('nebentaetigkeiten', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="nebentaetigkeiten"
                            value="nein"
                            checked={formData.nebentaetigkeiten === 'nein'}
                            onChange={() => handleRadioChange('nebentaetigkeiten', 'nein')}
                        />
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
                                <button
                                    type="button"
                                    className="counter-btn decrease"
                                    onClick={() => handleCounterChange('anzahlNebentaetigkeiten', 'decrease')}
                                    disabled={formData.anzahlNebentaetigkeiten <= 1}
                                >
                                    <span>-</span>
                                </button>
                                <span className="counter-value">{formData.anzahlNebentaetigkeiten}</span>
                                <button
                                    type="button"
                                    className="counter-btn increase"
                                    onClick={() => handleCounterChange('anzahlNebentaetigkeiten', 'increase')}
                                    disabled={formData.anzahlNebentaetigkeiten >= 3}
                                >
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="nebentaetigkeit-details">
                        <h3 className="nebentaetigkeit-title">Ihre Nebentätigkeit 1</h3>

                        <div className="form-group">
                            <label className="form-label">Nettoeinkommen aus Nebentätigkeit</label>
                            <div className="income-input-container">
                                <div className="income-input-wrapper">
                                    <input
                                        type="text"
                                        className="income-input"
                                        placeholder="z.B. 500"
                                        value={formData.nebenEinkommen}
                                        onChange={(e) => handleRadioChange('nebenEinkommen', e.target.value)}
                                    />
                                    <span className="income-currency">€/Monat</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sind die Einnahmen aus der Nebentätigkeit befristet?</label>
                            <div className="radio-options">
                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenEinkommenBefristet"
                                        value="ja"
                                        checked={formData.nebenEinkommenBefristet === 'ja'}
                                        onChange={() => handleRadioChange('nebenEinkommenBefristet', 'ja')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Ja</span>
                                </label>

                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenEinkommenBefristet"
                                        value="nein"
                                        checked={formData.nebenEinkommenBefristet === 'nein'}
                                        onChange={() => handleRadioChange('nebenEinkommenBefristet', 'nein')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Nein</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Um welche Art von Nebenbeschäftigung handelt es sich?</label>
                            <div className="radio-options">
                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungsArt"
                                        value="Angestellten-/Arbeitertätigkeit"
                                        checked={formData.nebenBeschaeftigungsArt === 'Angestellten-/Arbeitertätigkeit'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungsArt', 'Angestellten-/Arbeitertätigkeit')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Angestellten-/Arbeitertätigkeit</span>
                                </label>

                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungsArt"
                                        value="Selbständige Tätigkeit"
                                        checked={formData.nebenBeschaeftigungsArt === 'Selbständige Tätigkeit'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungsArt', 'Selbständige Tätigkeit')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Selbständige Tätigkeit</span>
                                </label>

                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungsArt"
                                        value="Beamtentätigkeit"
                                        checked={formData.nebenBeschaeftigungsArt === 'Beamtentätigkeit'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungsArt', 'Beamtentätigkeit')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Beamtentätigkeit</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Seit wann üben Sie die Nebentätigkeit aus?</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="MM/JJJJ"
                                value={formData.nebenBeschaeftigungSeit}
                                onChange={(e) => handleRadioChange('nebenBeschaeftigungSeit', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Ist Ihre Nebenbeschäftigung befristet?</label>
                            <div className="radio-options">
                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungBefristet"
                                        value="ja"
                                        checked={formData.nebenBeschaeftigungBefristet === 'ja'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungBefristet', 'ja')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Ja</span>
                                </label>

                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungBefristet"
                                        value="nein"
                                        checked={formData.nebenBeschaeftigungBefristet === 'nein'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungBefristet', 'nein')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Nein</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Befinden Sie sich bei Ihrer Nebenbeschäftigung in der Probezeit?</label>
                            <div className="radio-options">
                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungProbezeit"
                                        value="ja"
                                        checked={formData.nebenBeschaeftigungProbezeit === 'ja'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungProbezeit', 'ja')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Ja</span>
                                </label>

                                <label className="radio-container">
                                    <input
                                        type="radio"
                                        name="nebenBeschaeftigungProbezeit"
                                        value="nein"
                                        checked={formData.nebenBeschaeftigungProbezeit === 'nein'}
                                        onChange={() => handleRadioChange('nebenBeschaeftigungProbezeit', 'nein')}
                                    />
                                    <span className="radio-checkmark"></span>
                                    <span className="radio-text">Nein</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <h2 className="section-title">Sonstiges Einkommen</h2>

            <div className="collapsible-info">
                <button
                    type="button"
                    className="collapsible-btn"
                    onClick={() => toggleCollapsible('sonstiges')}
                >
                    Warum fragen wir das? <span className={`arrow-down ${!infoCollapsed ? 'rotated' : ''}`}>▼</span>
                </button>
                <div className={`collapsible-content ${infoCollapsed ? 'collapsed' : ''}`}>
                    <p><strong>Weitere Einkommen verbessern Ihre Bonität</strong></p>
                    <p>Weiteres Einkommen kann Ihre Kreditwürdigkeit verbessern.</p>
                </div>
            </div>

            <div className={`form-group ${activeTooltip === 'kindergeld' ? 'has-active-tooltip' : ''}`}>
                <label className="form-label">
                    Anzahl kindergeldberechtigter Kinder
                    <div
                        className="income-info-icon"
                        onClick={() => toggleTooltip('kindergeld')}
                        style={{
                            display: 'inline-block',
                            marginLeft: '5px',
                            position: 'relative',
                            top: '6px'
                        }}
                    >
                        <span>i</span>
                    </div>
                </label>
                <div className="income-input-container">
                    <div className="counter-control">
                        <button
                            type="button"
                            className="counter-btn decrease"
                            onClick={() => handleCounterChange('anzahlKinder', 'decrease')}
                            disabled={formData.anzahlKinder <= 0}
                        >
                            <span>-</span>
                        </button>
                        <span className="counter-value">{formData.anzahlKinder}</span>
                        <button
                            type="button"
                            className="counter-btn increase"
                            onClick={() => handleCounterChange('anzahlKinder', 'increase')}
                        >
                            <span>+</span>
                        </button>
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
                        <input
                            type="radio"
                            name="sonstigeEinkuenfte"
                            value="ja"
                            checked={formData.sonstigeEinkuenfte === 'ja'}
                            onChange={() => handleRadioChange('sonstigeEinkuenfte', 'ja')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Ja</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="sonstigeEinkuenfte"
                            value="nein"
                            checked={formData.sonstigeEinkuenfte === 'nein'}
                            onChange={() => handleRadioChange('sonstigeEinkuenfte', 'nein')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Nein</span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderEmploymentStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Beschäftigungsverhältnis</h1>

            <div className="form-group">
                <label className="form-label">Beschäftigungsstatus</label>

                <div className="radio-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="employment"
                            value="angestellt"
                            checked={formData.employment === 'angestellt'}
                            onChange={() => handleRadioChange('employment', 'angestellt')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Angestellte(r)</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="employment"
                            value="arbeiter"
                            checked={formData.employment === 'arbeiter'}
                            onChange={() => handleRadioChange('employment', 'arbeiter')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Arbeiter(in)</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="employment"
                            value="beamter"
                            checked={formData.employment === 'beamter'}
                            onChange={() => handleRadioChange('employment', 'beamter')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Beamte(r)</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="employment"
                            value="selbstaendig"
                            checked={formData.employment === 'selbstaendig'}
                            onChange={() => handleRadioChange('employment', 'selbstaendig')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Selbständig</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="employment"
                            value="rentner"
                            checked={formData.employment === 'rentner'}
                            onChange={() => handleRadioChange('employment', 'rentner')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Rentner(in)</span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderSummaryStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title">Zusammenfassung</h1>

            <div className="summary-container">
                <div className="summary-section">
                    <h3>Kreditnehmer</h3>
                    <p>{formData.applicants === '1' ? '1 Kreditnehmer' : '2 Kreditnehmer'}</p>
                </div>

                <div className="summary-section">
                    <h3>Familienstand</h3>
                    <p>{formData.maritalStatus}</p>
                </div>

                <div className="summary-section">
                    <h3>Haushalt</h3>
                    <p>{formData.adults} Erwachsene, {formData.children} Kinder</p>
                    <p className="total-people">Insgesamt: {parseInt(formData.adults) + parseInt(formData.children)} Personen im Haushalt</p>
                </div>

                <div className="summary-section">
                    <h3>Wohnsituation</h3>
                    <p>{formData.housingStatus}</p>
                </div>

                <div className="summary-section">
                    <h3>Vermietete Immobilie</h3>
                    <p>{formData.hasRentalProperty === 'ja' ? 'Ja' : 'Nein'}</p>
                </div>

                <div className="summary-section">
                    <h3>Ausgaben</h3>
                    {formData.warmMiete && <p>Warmmiete: {formData.warmMiete} €/Monat</p>}
                    <p>Privat krankenversichert: {formData.privateKrankenversicherung === 'ja' ? 'Ja' : 'Nein'}</p>
                    <p>Ehegattenunterhalt: {formData.ehegattenunterhalt === 'ja' ? 'Ja' : 'Nein'}</p>
                    <p>Kinderunterhalt: {formData.kinderunterhalt === 'ja' ? 'Ja' : 'Nein'}</p>
                    <p>PKW: {formData.hasCar === 'ja' ? 'Ja' : 'Nein'}</p>
                    <p>Karten: {formData.kreditkarten}</p>
                </div>

                {formData.nettoEinkommen && (
                    <div className="summary-section">
                        <h3>Einkommen</h3>
                        <p>{formData.nettoEinkommen} € / Monat</p>
                    </div>
                )}

                {formData.employment && (
                    <div className="summary-section">
                        <h3>Beschäftigungsstatus</h3>
                        <p>{formData.employment}</p>
                    </div>
                )}
            </div>

            <div className="form-info">
                <p>Klicken Sie auf "Weiter", um Ihre individuelle Kreditberechnung zu starten.</p>
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return renderCreditApplicantsStep();
            case 2:
                return renderMaritalStatusStep();
            case 3:
                return renderHouseholdStep();
            case 4:
                return renderRentalPropertyStep();
            case 5:
                return renderExpensesStep();
            case 6:
                return renderIncomeStep();
            case 7:
                return renderEmploymentStep();
            case 8:
                return renderSummaryStep();
            default:
                return renderCreditApplicantsStep();
        }
    };

    return (
        <div className="credit-application-form">
            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${calculateProgress()}%` }}
                    >
                        <span className="progress-percentage">{calculateProgress()}%</span>
                    </div>
                </div>
            </div>

            {renderCurrentStep()}

            <div className="form-actions">
                <button
                    className="btn btn-back"
                    onClick={goToPreviousStep}
                    disabled={step === 1 || isAnimating}
                >
                    <span className="arrow-left">←</span> Zurück
                </button>

                <button
                    className="btn btn-next"
                    onClick={goToNextStep}
                    disabled={isAnimating}
                >
                    Weiter <span className="arrow-right">→</span>
                </button>
            </div>

            <div className="security-info">
                <div className="lock-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </svg>
                </div>
                <div className="security-text">
                    <p>Wir schützen Ihre Daten</p>
                    <p>Sichere SSL-Verschlüsselung</p>
                </div>
            </div>
        </div>
    );
};

export default CreditApplicationForm;