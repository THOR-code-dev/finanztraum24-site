import React, { useState, useEffect } from 'react';
import './CreditApplicationForm.css';
import ingLogo from '../assets/ing.jpg';
import santanderLogo from '../assets/santander.jpg';
import targobankLogo from '../assets/targobank.jpg';

const CreditApplicationForm = () => {
    const [step, setStep] = useState(1);
    const [totalSteps] = useState(11);
    const [formData, setFormData] = useState({
        applicants: '1',
        maritalStatus: 'ledig',
        adults: 1,
        children: 0,
        housingStatus: 'zur Miete',
        hasRentalProperty: 'nein',
        warmMiete: '',
        privateKrankenversicherung: 'nein',
        privatKrankenkasseBeitrag: '',
        ehegattenunterhalt: 'nein',
        ehegattenunterhaltBetrag: '',
        kinderunterhalt: 'nein',
        kinderunterhaltBetrag: '',
        hasCar: 'nein',
        kreditkarten: 'EC-Karte(n) und Kreditkarte(n)',
        berufsgruppe: 'Angestellte/r',
        nettoEinkommen: '',
        einkommensAbweichung: 'nein',
        nebentaetigkeiten: 'nein',
        anzahlNebentaetigkeiten: 1,
        nebenEinkommen1: '',
        nebenEinkommenBefristet1: 'nein',
        nebenBeschaeftigungsArt1: 'Angestellten-/Arbeitertätigkeit',
        nebenBeschaeftigungSeit1: '',
        nebenBeschaeftigungBefristet1: 'nein',
        nebenBeschaeftigungBefristetBis1: '',
        nebenBeschaeftigungProbezeit1: 'nein',
        nebenBeschaeftigungVerlaengert1: 'nein',
        nebenEinkommen2: '',
        nebenEinkommenBefristet2: 'nein',
        nebenBeschaeftigungsArt2: 'Angestellten-/Arbeitertätigkeit',
        nebenBeschaeftigungSeit2: '',
        nebenBeschaeftigungBefristet2: 'nein',
        nebenBeschaeftigungBefristetBis2: '',
        nebenBeschaeftigungProbezeit2: 'nein',
        nebenBeschaeftigungVerlaengert2: 'nein',
        nebenEinkommen3: '',
        nebenEinkommenBefristet3: 'nein',
        nebenBeschaeftigungsArt3: 'Angestellten-/Arbeitertätigkeit',
        nebenBeschaeftigungSeit3: '',
        nebenBeschaeftigungBefristet3: 'nein',
        nebenBeschaeftigungBefristetBis3: '',
        nebenBeschaeftigungProbezeit3: 'nein',
        nebenBeschaeftigungVerlaengert3: 'nein',
        kindergeld: 'nein',
        anzahlKinder: 5,
        sonstigeEinkuenfte: 'nein',
        immobilieArt: '',
        immobilieFlaeche: '',
        vermieteteImmobilieArt: '',
        vermieteteImmobilieFlaeche: '',
        mieteinnahmen: '',
        ehegattenunterhaltBetrag: '',
        kreditkarten: 'EC-Karte(n) und Kreditkarte(n)',
        anrede: 'Herr',
        vorname: '',
        nachname: '',
        email: '',
        telefon: '',
        datenschutz: false,
        geburtsdatum: '',
        geburtsort: '',
        geburtsland: 'Deutschland',
        staatsangehoerigkeit: 'Deutschland',
        // Yabancı vatandaşlar için ek alanlar
        inDeutschlandSeit: '',
        aufenthaltsgenehmigungBefristet: 'nein',
        aufenthaltserlaubnisBis: '',
        arbeitserlaubnisBefristet: 'nein',
        arbeitserlaubnisBis: '',
        // Adres bilgileri için ek alanlar
        wohnland: 'Deutschland',
        strasse: '',
        plz: '',
        wohnort: '',
        wohnhaftSeit: '',
        firmaArbeitgeber: '',
        landArbeitgeber: 'Deutschland',
        strasseArbeitgeber: '',
        plzArbeitgeber: '',
        ortArbeitgeber: '',
        branche: '',
        beschaeftigung: '',
        arbeitszeitTeilzeit: 'Vollzeit',
        arbeitsverhaltnisBefristet: 'nein',
    });
    const [animationDirection, setAnimationDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [infoCollapsed, setInfoCollapsed] = useState(false);
    const [warumInfoCollapsed, setWarumInfoCollapsed] = useState(true);
    const [warmMieteError, setWarmMieteError] = useState('');
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [activeFieldInfo, setActiveFieldInfo] = useState(null);

    const handleRadioChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Warmmiete alanı için özel kontrol
        if (name === 'warmMiete') {
            if (value === '') {
                setWarmMieteError('Bu alan gereklidir.');
            } else if (parseFloat(value) > 30000) {
                setWarmMieteError('Tutar 30.000 ₺ tutarını aşamaz.');
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

        // 11. adım son adım olduğu için işlem yapma
        if (step === 11) {
            // Form tamamlandı, burada form gönderme işlemi yapılabilir
            return;
        }

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
        let currentProgress = basePercentage + ((step - 1) * stepPercentage);

        // 7. adım için özel yükleme çubuk değeri
        if (step === 7) {
            currentProgress = 49;
        }

        // 8. adım için özel yükleme çubuk değeri
        if (step === 8) {
            currentProgress = 54;
        }

        // 9. adım için özel yükleme çubuk değeri
        if (step === 9) {
            currentProgress = 59;
        }

        // 10. adım için özel yükleme çubuk değeri
        if (step === 10) {
            currentProgress = 63;
        }

        // 11. adım için özel yükleme çubuk değeri
        if (step === 11) {
            currentProgress = 67;
        }

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

    const toggleWarumInfo = () => {
        setWarumInfoCollapsed(!warumInfoCollapsed);
    };

    const toggleFieldInfo = (field) => {
        if (activeFieldInfo === field) {
            setActiveFieldInfo(null);
        } else {
            setActiveFieldInfo(field);
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
            <h1 className="form-title" style={{ color: 'white' }}>Ihr persönlicher Kreditvergleich</h1>

            <div className="certification-badge">
                <img src="https://via.placeholder.com/100x100?text=100%" alt="100% Schufa Neutral" />
            </div>

            <div className="form-info" style={{ color: '#f8f8f8' }}>
                <p style={{ color: '#f8f8f8' }}>
                    Persönliche Angebote gibt es nur nach einer Prüfung der
                    Kreditwürdigkeit. Dafür benötigen wir Informationen zu Ihrer
                    Person und finanziellen Situation.
                </p>

                <p style={{ color: '#f8f8f8' }}>
                    Nach Eingabe dieser Daten erhalten Sie von uns einen Überblick
                    über die besten für Sie verfügbaren Kreditangebote.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: '#f8f8f8' }}>Anzahl Kreditnehmer</label>

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
            <h1 className="form-title" style={{ color: 'white' }}>Familienstand</h1>

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
            <h1 className="form-title" style={{ color: 'white' }}>Haushaltsführung</h1>

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

    // Selbstgenutzte ve Vermietete Immobilie'yi birleştiren adım
    const renderImmobilienStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: 'white' }}>Selbstgenutzte Immobilie</h1>

            <div className="form-group">
                <label className="form-label">Welche Art von Immobilie besitzen Sie?</label>

                <div className="radio-options immobilie-options">
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="eigentumswohnung"
                            checked={formData.immobilieArt === 'eigentumswohnung'}
                            onChange={() => handleRadioChange('immobilieArt', 'eigentumswohnung')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Eigentumswohnung</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="einfamilienhaus"
                            checked={formData.immobilieArt === 'einfamilienhaus'}
                            onChange={() => handleRadioChange('immobilieArt', 'einfamilienhaus')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Einfamilienhaus</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="mehrfamilienhaus"
                            checked={formData.immobilieArt === 'mehrfamilienhaus'}
                            onChange={() => handleRadioChange('immobilieArt', 'mehrfamilienhaus')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Mehrfamilienhaus</span>
                    </label>

                    <label className="radio-container">
                        <input
                            type="radio"
                            name="immobilieArt"
                            value="bürogeschäftsgebäude"
                            checked={formData.immobilieArt === 'bürogeschäftsgebäude'}
                            onChange={() => handleRadioChange('immobilieArt', 'bürogeschäftsgebäude')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text">Büro-/Geschäftsgebäude</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Fläche selbstgenutzte Immobilie</label>
                <div className="input-wrapper">
                    <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="z.B. 120"
                        value={formData.immobilieFlaeche || ''}
                        onChange={(e) => handleRadioChange('immobilieFlaeche', e.target.value)}
                    />
                    <span className="unit-symbol">qm</span>
                </div>
            </div>

            <h1 className="form-title" style={{ color: 'white', marginTop: '40px' }}>Vermietete Immobilie</h1>

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

            {formData.hasRentalProperty === 'ja' && (
                <>
                    <div className="form-group">
                        <label className="form-label">Welche Art von Immobilie vermieten Sie?</label>

                        <div className="radio-options immobilie-options">
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="eigentumswohnung"
                                    checked={formData.vermieteteImmobilieArt === 'eigentumswohnung'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'eigentumswohnung')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Eigentumswohnung</span>
                            </label>

                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="einfamilienhaus"
                                    checked={formData.vermieteteImmobilieArt === 'einfamilienhaus'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'einfamilienhaus')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Einfamilienhaus</span>
                            </label>

                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="mehrfamilienhaus"
                                    checked={formData.vermieteteImmobilieArt === 'mehrfamilienhaus'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'mehrfamilienhaus')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Mehrfamilienhaus</span>
                            </label>

                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="vermieteteImmobilieArt"
                                    value="bürogeschäftsgebäude"
                                    checked={formData.vermieteteImmobilieArt === 'bürogeschäftsgebäude'}
                                    onChange={() => handleRadioChange('vermieteteImmobilieArt', 'bürogeschäftsgebäude')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text">Büro-/Geschäftsgebäude</span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Fläche vermietete Immobilie</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="z.B. 120"
                                value={formData.vermieteteImmobilieFlaeche || ''}
                                onChange={(e) => handleRadioChange('vermieteteImmobilieFlaeche', e.target.value)}
                            />
                            <span className="unit-symbol">qm</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    const renderExpensesStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: 'white' }}>Ausgaben</h1>

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

                {formData.privateKrankenversicherung === 'ja' && (
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label" style={{ fontSize: '14px', color: '#999' }}>Private Krankenversicherung</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.privatKrankenkasseBeitrag || ''}
                                onChange={(e) => handleRadioChange('privatKrankenkasseBeitrag', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                            Nennen Sie uns bitte den monatlichen Beitrag für Ihre private Krankenversicherung, den Sie als Arbeitnehmer selbst zahlen. Wichtig: Nicht gemeint sind hier private Zusatzversicherungen für gesetzlich Versicherte.
                        </p>
                    </div>
                )}
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

                {formData.ehegattenunterhalt === 'ja' && (
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label" style={{ fontSize: '14px', color: '#999' }}>Ehegattenunterhalt (nach Scheidung)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.ehegattenunterhaltBetrag || ''}
                                onChange={(e) => handleRadioChange('ehegattenunterhaltBetrag', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                    </div>
                )}
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

                {formData.kinderunterhalt === 'ja' && (
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label" style={{ fontSize: '14px', color: '#999' }}>Zu zahlender Kindesunterhalt</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.kinderunterhaltBetrag || ''}
                                onChange={(e) => handleRadioChange('kinderunterhaltBetrag', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                    </div>
                )}
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
            <h1 className="form-title" style={{ color: 'white' }}>Berufsgruppe</h1>

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

            <h2 className="section-title" style={{ color: 'white' }}>Einkommen aus Haupttätigkeit</h2>

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

            <h2 className="section-title" style={{ color: 'white' }}>Berufliche Nebentätigkeiten</h2>

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

                    {/* Yan iş formlarını seçilen sayıya göre oluşturma */}
                    {[...Array(formData.anzahlNebentaetigkeiten)].map((_, index) => (
                        <div className="nebentaetigkeit-details" key={`nebentaetigkeit-${index + 1}`}>
                            <h3 className="nebentaetigkeit-title" style={{ color: 'white' }}>Ihre Nebentätigkeit {index + 1}</h3>

                            <div className="form-group">
                                <label className="form-label">Nettoeinkommen aus Nebentätigkeit</label>
                                <div className="income-input-container">
                                    <div className="income-input-wrapper">
                                        <input
                                            type="text"
                                            className="income-input"
                                            placeholder="z.B. 500"
                                            value={formData[`nebenEinkommen${index + 1}`] || ''}
                                            onChange={(e) => handleRadioChange(`nebenEinkommen${index + 1}`, e.target.value)}
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
                                            name={`nebenEinkommenBefristet${index + 1}`}
                                            value="ja"
                                            checked={formData[`nebenEinkommenBefristet${index + 1}`] === 'ja'}
                                            onChange={() => handleRadioChange(`nebenEinkommenBefristet${index + 1}`, 'ja')}
                                        />
                                        <span className="radio-checkmark"></span>
                                        <span className="radio-text">Ja</span>
                                    </label>

                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name={`nebenEinkommenBefristet${index + 1}`}
                                            value="nein"
                                            checked={formData[`nebenEinkommenBefristet${index + 1}`] === 'nein'}
                                            onChange={() => handleRadioChange(`nebenEinkommenBefristet${index + 1}`, 'nein')}
                                        />
                                        <span className="radio-checkmark"></span>
                                        <span className="radio-text">Nein</span>
                                    </label>
                                </div>
                            </div>

                            {formData[`nebenEinkommenBefristet${index + 1}`] !== 'nein' && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">Um welche Art von Nebenbeschäftigung handelt es sich?</label>
                                        <div className="radio-options">
                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungsArt${index + 1}`}
                                                    value="Angestellten-/Arbeitertätigkeit"
                                                    checked={formData[`nebenBeschaeftigungsArt${index + 1}`] === 'Angestellten-/Arbeitertätigkeit'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungsArt${index + 1}`, 'Angestellten-/Arbeitertätigkeit')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Angestellten-/Arbeitertätigkeit</span>
                                            </label>

                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungsArt${index + 1}`}
                                                    value="Selbständige Tätigkeit"
                                                    checked={formData[`nebenBeschaeftigungsArt${index + 1}`] === 'Selbständige Tätigkeit'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungsArt${index + 1}`, 'Selbständige Tätigkeit')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Selbständige Tätigkeit</span>
                                            </label>

                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungsArt${index + 1}`}
                                                    value="Beamtentätigkeit"
                                                    checked={formData[`nebenBeschaeftigungsArt${index + 1}`] === 'Beamtentätigkeit'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungsArt${index + 1}`, 'Beamtentätigkeit')}
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
                                            value={formData[`nebenBeschaeftigungSeit${index + 1}`] || ''}
                                            onChange={(e) => handleRadioChange(`nebenBeschaeftigungSeit${index + 1}`, e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Ist Ihre Nebenbeschäftigung befristet?</label>
                                        <div className="radio-options">
                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungBefristet${index + 1}`}
                                                    value="ja"
                                                    checked={formData[`nebenBeschaeftigungBefristet${index + 1}`] === 'ja'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungBefristet${index + 1}`, 'ja')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Ja</span>
                                            </label>

                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungBefristet${index + 1}`}
                                                    value="nein"
                                                    checked={formData[`nebenBeschaeftigungBefristet${index + 1}`] === 'nein'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungBefristet${index + 1}`, 'nein')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Nein</span>
                                            </label>
                                        </div>
                                    </div>

                                    {formData[`nebenBeschaeftigungBefristet${index + 1}`] === 'ja' && (
                                        <div className="form-group">
                                            <label className="form-label">Befristet bis</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="MM/JJJJ"
                                                value={formData[`nebenBeschaeftigungBefristetBis${index + 1}`] || ''}
                                                onChange={(e) => handleRadioChange(`nebenBeschaeftigungBefristetBis${index + 1}`, e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="form-label">Befinden Sie sich bei Ihrer Nebenbeschäftigung in der Probezeit?</label>
                                        <div className="radio-options">
                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungProbezeit${index + 1}`}
                                                    value="ja"
                                                    checked={formData[`nebenBeschaeftigungProbezeit${index + 1}`] === 'ja'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungProbezeit${index + 1}`, 'ja')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Ja</span>
                                            </label>

                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name={`nebenBeschaeftigungProbezeit${index + 1}`}
                                                    value="nein"
                                                    checked={formData[`nebenBeschaeftigungProbezeit${index + 1}`] === 'nein'}
                                                    onChange={() => handleRadioChange(`nebenBeschaeftigungProbezeit${index + 1}`, 'nein')}
                                                />
                                                <span className="radio-checkmark"></span>
                                                <span className="radio-text">Nein</span>
                                            </label>
                                        </div>
                                    </div>

                                    {formData[`nebenBeschaeftigungProbezeit${index + 1}`] === 'nein' && formData[`nebenBeschaeftigungBefristet${index + 1}`] === 'ja' && (
                                        <div className="form-group">
                                            <label className="form-label">Wurde der Arbeitsvertrag Ihrer Nebenbeschäftigung beim aktuellen Arbeitgeber schon mindestens einmal verlängert?</label>
                                            <div className="radio-options">
                                                <label className="radio-container">
                                                    <input
                                                        type="radio"
                                                        name={`nebenBeschaeftigungVerlaengert${index + 1}`}
                                                        value="ja"
                                                        checked={formData[`nebenBeschaeftigungVerlaengert${index + 1}`] === 'ja'}
                                                        onChange={() => handleRadioChange(`nebenBeschaeftigungVerlaengert${index + 1}`, 'ja')}
                                                    />
                                                    <span className="radio-checkmark"></span>
                                                    <span className="radio-text">Ja</span>
                                                </label>

                                                <label className="radio-container">
                                                    <input
                                                        type="radio"
                                                        name={`nebenBeschaeftigungVerlaengert${index + 1}`}
                                                        value="nein"
                                                        checked={formData[`nebenBeschaeftigungVerlaengert${index + 1}`] === 'nein'}
                                                        onChange={() => handleRadioChange(`nebenBeschaeftigungVerlaengert${index + 1}`, 'nein')}
                                                    />
                                                    <span className="radio-checkmark"></span>
                                                    <span className="radio-text">Nein</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </>
            )}

            <h2 className="section-title" style={{ color: 'white' }}>Sonstiges Einkommen</h2>

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

            {formData.sonstigeEinkuenfte === 'ja' && (
                <>
                    <div className="form-group">
                        <label className="form-label">Ehegattenunterhalt</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.ehegattenunterhaltBetrag || ''}
                                onChange={(e) => handleRadioChange('ehegattenunterhaltBetrag', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Rente (netto)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.renteNetto || ''}
                                onChange={(e) => handleRadioChange('renteNetto', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Eingehender Kindesunterhalt</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={formData.kindesunterhaltEingehend || ''}
                                onChange={(e) => handleRadioChange('kindesunterhaltEingehend', e.target.value)}
                            />
                            <span className="currency-symbol">€/Monat</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                            Falls gerichtlich festgelegt ist, dass Sie Unterhalt für Kinder erhalten, geben Sie bitte die Gesamtsumme dieser monatlichen Unterhaltseinkünfte an.
                        </p>
                    </div>
                </>
            )}
        </div>
    );

    const renderLoadingStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: '#054F9C', textAlign: 'center', marginBottom: '60px', fontSize: '30px' }}>Bitte haben Sie einen Augenblick Geduld!</h1>

            <div className="bank-offers-container" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                maxWidth: '650px',
                margin: '0 auto'
            }}>
                {/* Targobank */}
                <div className="bank-offer" style={{
                    background: 'white',
                    padding: '35px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '35px'
                    }}>
                        <img
                            src={targobankLogo}
                            alt="Targobank"
                            style={{ height: '55px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '60%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '40%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ING */}
                <div className="bank-offer" style={{
                    background: 'white',
                    padding: '35px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '35px'
                    }}>
                        <img
                            src={ingLogo}
                            alt="ING"
                            style={{ height: '55px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '50%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '70%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Santander */}
                <div className="bank-offer" style={{
                    background: 'white',
                    padding: '35px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '35px'
                    }}>
                        <img
                            src={santanderLogo}
                            alt="Santander"
                            style={{ height: '55px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '65%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                            <div style={{
                                width: '220px',
                                height: '28px',
                                background: '#eaeaea',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                marginLeft: '40px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '55%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.1)',
                                    animation: 'loading 1.5s infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );

    // 7. adımdan sonra 5 saniye sonra 8. adıma geçiş için useEffect ekleyelim
    useEffect(() => {
        if (step === 7) {
            const timer = setTimeout(() => {
                setStep(8); // Direk olarak setStep kullanarak 8. adıma geçiyoruz
                setAnimationDirection('next'); // Animasyon yönünü ayarlıyoruz
            }, 5000); // 5 saniye sonra geçiş yap

            return () => clearTimeout(timer); // Component unmount olduğunda timer'ı temizle
        }
    }, [step]); // Sadece step değiştiğinde çalışacak

    const renderContactStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: '#fff', textAlign: 'center', marginBottom: '30px', fontSize: '26px' }}>
                Erhalten Sie Ihre Kreditangebote
            </h1>

            <p style={{ textAlign: 'center', color: '#fff', marginBottom: '30px', fontSize: '16px' }}>
                Fast geschafft: Um die für Sie besten Kreditangebote anzuzeigen, benötigen wir noch einige Angaben zu Ihrer Person.
            </p>

            <div className="form-group" style={{ marginBottom: '25px' }}>
                <h3 style={{ marginBottom: '15px', color: '#fff', fontSize: '18px' }}>Kontaktdaten</h3>

                <div style={{ marginBottom: '20px' }}>
                    <div className="accordion-section" style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '5px',
                        padding: '15px',
                        marginBottom: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer'
                    }} onClick={toggleWarumInfo}>
                        <div className="accordion-header" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="accordion-icon" style={{ marginRight: '10px', color: '#fff', transform: warumInfoCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
                                ▼
                            </div>
                            <span style={{ color: '#fff', fontWeight: '500' }}>Warum fragen wir das?</span>
                        </div>

                        {!warumInfoCollapsed && (
                            <div className="accordion-content" style={{
                                marginTop: '15px',
                                padding: '15px',
                                backgroundColor: 'rgba(240, 248, 255, 0.9)',
                                borderRadius: '5px',
                                color: '#00468c'
                            }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#00468c' }}>
                                    Kreditinstitute müssen Ihre Identität prüfen
                                </h4>
                                <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#00468c' }}>
                                    Kreditinstitute sind durch § 10 Absatz 1 GwG verpflichtet, Angaben zur Person des Kreditnehmers zu erheben und dessen Identität zu überprüfen. Ihr Vorteil: Alle Angaben sind 100% Schufaneutral und haben keine Auswirkungen auf Ihren Schufa-Score.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '10px' }}>Anrede</label>
                <div className="radio-options" style={{ marginBottom: '20px' }}>
                    <label className="radio-container" style={{ display: 'inline-block', marginRight: '20px' }}>
                        <input
                            type="radio"
                            name="anrede"
                            value="Herr"
                            checked={formData.anrede === 'Herr'}
                            onChange={() => handleRadioChange('anrede', 'Herr')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text" style={{ color: '#fff' }}>Herr</span>
                    </label>

                    <label className="radio-container" style={{ display: 'inline-block' }}>
                        <input
                            type="radio"
                            name="anrede"
                            value="Frau"
                            checked={formData.anrede === 'Frau'}
                            onChange={() => handleRadioChange('anrede', 'Frau')}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-text" style={{ color: '#fff' }}>Frau</span>
                    </label>
                </div>

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Vorname</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="text"
                                placeholder="z.B. Max"
                                value={formData.vorname}
                                onChange={(e) => handleRadioChange('vorname', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
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
                            onClick={() => toggleFieldInfo('vorname')}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                        </div>
                    </div>
                    <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                        Bitte geben Sie Ihren Vornamen an.
                    </div>

                    {activeFieldInfo === 'vorname' && (
                        <div style={{
                            marginTop: '10px',
                            padding: '15px',
                            backgroundColor: '#e9f3fc',
                            borderRadius: '5px',
                            color: '#00468c',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            <p style={{ margin: 0 }}>
                                <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Nachname</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="text"
                                placeholder="z.B. Müller"
                                value={formData.nachname}
                                onChange={(e) => handleRadioChange('nachname', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
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
                            onClick={() => toggleFieldInfo('nachname')}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                        </div>
                    </div>
                    <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                        Bitte geben Sie Ihren Nachnamen an.
                    </div>

                    {activeFieldInfo === 'nachname' && (
                        <div style={{
                            marginTop: '10px',
                            padding: '15px',
                            backgroundColor: '#e9f3fc',
                            borderRadius: '5px',
                            color: '#00468c',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            <p style={{ margin: 0 }}>
                                <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Handynummer/Telefonnummer</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="tel"
                                placeholder="z.B. 0176 12345678"
                                value={formData.telefon}
                                onChange={(e) => handleRadioChange('telefon', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
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
                            onClick={() => toggleFieldInfo('telefon')}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                        </div>
                    </div>
                    <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                        Bitte teilen Sie uns Ihre Mobilfunknummer mit.
                    </div>

                    {activeFieldInfo === 'telefon' && (
                        <div style={{
                            marginTop: '10px',
                            padding: '15px',
                            backgroundColor: '#e9f3fc',
                            borderRadius: '5px',
                            color: '#00468c',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
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
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}>i</div>
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

            <div className="form-actions" style={{ marginTop: '30px' }}>
                <button
                    className="btn btn-back"
                    onClick={goToPreviousStep}
                    disabled={isAnimating}
                >
                    <span className="arrow-left">←</span> Geri
                </button>

                <button
                    className="btn btn-next"
                    onClick={goToNextStep}
                    disabled={isAnimating}
                >
                    İlerle <span className="arrow-right">→</span>
                </button>
            </div>
        </div>
    );



    // 9. adım - Kişisel Bilgiler
    const renderPersonalDataStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: 'white' }}>Persönliche Daten</h1>

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
                        <div className="accordion-icon" style={{ marginRight: '10px', color: 'white', transform: warumInfoCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
                            ▼
                        </div>
                        <span style={{ color: 'white', fontWeight: '500' }}>Warum fragen wir das?</span>
                    </div>

                    {!warumInfoCollapsed && (
                        <div className="accordion-content" style={{
                            marginTop: '15px',
                            padding: '15px',
                            backgroundColor: 'rgba(240, 248, 255, 0.9)',
                            borderRadius: '5px',
                            color: '#00468c'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#00468c' }}>
                                Kreditinstitute müssen Ihre Identität prüfen
                            </h4>
                            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#00468c' }}>
                                Kreditinstitute sind durch § 10 Absatz 1 GwG verpflichtet, Angaben zur Person des Kreditnehmers zu erheben und dessen Identität zu überprüfen. Ihr Vorteil: Alle Angaben sind 100% Schufaneutral und haben keine Auswirkungen auf Ihren Schufa-Score.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Geburtsdatum</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input
                            type="text"
                            placeholder="TT.MM.JJJJ"
                            value={formData.geburtsdatum}
                            onChange={(e) => handleRadioChange('geburtsdatum', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
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
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                    Bitte geben Sie Ihr Geburtsdatum an.
                </div>

                {activeFieldInfo === 'geburtsdatum' && (
                    <div style={{
                        marginTop: '10px',
                        padding: '15px',
                        backgroundColor: '#e9f3fc',
                        borderRadius: '5px',
                        color: '#00468c',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        <p style={{ margin: 0 }}>
                            <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                        </p>
                    </div>
                )}
            </div>

            <div style={{ marginBottom: '20px', position: 'relative' }}>
                <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Geburtsort</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type="text"
                        placeholder="z.B. Musterstadt"
                        value={formData.geburtsort}
                        onChange={(e) => handleRadioChange('geburtsort', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                    Bitte geben Sie Ihren Geburtsort an.
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Geburtsland</label>
                <div className="select-wrapper" style={{ position: 'relative' }}>
                    <select
                        value={formData.geburtsland}
                        onChange={(e) => handleRadioChange('geburtsland', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            appearance: 'none',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            backgroundColor: 'white'
                        }}
                    >
                        <option value="Deutschland">Deutschland</option>
                        <option value="Polen">Polen</option>
                        <option value="Rumänien">Rumänien</option>
                        <option value="Türkei">Türkei</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                        <option value="Frankreich">Frankreich</option>
                        <option value="Italien">Italien</option>
                        <option disabled>-------</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Ägypten">Ägypten</option>
                        <option value="Albanien">Albanien</option>
                        <option value="Algerien">Algerien</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua und Barbuda">Antigua und Barbuda</option>
                        <option value="Äquatorialguinea">Äquatorialguinea</option>
                        <option value="Argentinien">Argentinien</option>
                        <option value="Armenien">Armenien</option>
                        <option value="Aserbaidschan">Aserbaidschan</option>
                        <option value="Äthiopien">Äthiopien</option>
                        <option value="Australien">Australien</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesch">Bangladesch</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgien">Belgien</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivien">Bolivien</option>
                        <option value="Bosnien und Herzegowina">Bosnien und Herzegowina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brasilien">Brasilien</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgarien">Bulgarien</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Cookinseln">Cookinseln</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                        <option value="Dänemark">Dänemark</option>
                        <option value="Demokratische Republik Kongo">Demokratische Republik Kongo</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominikanische Republik">Dominikanische Republik</option>
                        <option value="Dschibuti">Dschibuti</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estland">Estland</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Fidschi">Fidschi</option>
                        <option value="Finnland">Finnland</option>
                        <option value="Gabun">Gabun</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgien">Georgien</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Griechenland">Griechenland</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Indien">Indien</option>
                        <option value="Indonesien">Indonesien</option>
                        <option value="Irak">Irak</option>
                        <option value="Iran">Iran</option>
                        <option value="Irland">Irland</option>
                        <option value="Island">Island</option>
                        <option value="Israel">Israel</option>
                        <option value="Jamaika">Jamaika</option>
                        <option value="Japan">Japan</option>
                        <option value="Jemen">Jemen</option>
                        <option value="Jordanien">Jordanien</option>
                        <option value="Kambodscha">Kambodscha</option>
                        <option value="Kamerun">Kamerun</option>
                        <option value="Kanada">Kanada</option>
                        <option value="Kasachstan">Kasachstan</option>
                        <option value="Katar">Katar</option>
                        <option value="Kenia">Kenia</option>
                        <option value="Kirgisistan">Kirgisistan</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Kolumbien">Kolumbien</option>
                        <option value="Komoren">Komoren</option>
                        <option value="Republik Kongo">Republik Kongo</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Kroatien">Kroatien</option>
                        <option value="Kuba">Kuba</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Laos">Laos</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Lettland">Lettland</option>
                        <option value="Libanon">Libanon</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyen">Libyen</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Litauen">Litauen</option>
                        <option value="Luxemburg">Luxemburg</option>
                        <option value="Madagaskar">Madagaskar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malediven">Malediven</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marokko">Marokko</option>
                        <option value="Marshallinseln">Marshallinseln</option>
                        <option value="Mauretanien">Mauretanien</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexiko">Mexiko</option>
                        <option value="Mikronesien">Mikronesien</option>
                        <option value="Moldau">Moldau</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolei">Mongolei</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Mosambik">Mosambik</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Neuseeland">Neuseeland</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niederlande">Niederlande</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Nordkorea">Nordkorea</option>
                        <option value="Nordmazedonien">Nordmazedonien</option>
                        <option value="Norwegen">Norwegen</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palästina">Palästina</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua-Neuguinea">Papua-Neuguinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippinen">Philippinen</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Ruanda">Ruanda</option>
                        <option value="Russland">Russland</option>
                        <option value="Salomonen">Salomonen</option>
                        <option value="Sambia">Sambia</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="São Tomé und Príncipe">São Tomé und Príncipe</option>
                        <option value="Saudi-Arabien">Saudi-Arabien</option>
                        <option value="Schweden">Schweden</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbien">Serbien</option>
                        <option value="Seychellen">Seychellen</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Simbabwe">Simbabwe</option>
                        <option value="Singapur">Singapur</option>
                        <option value="Slowakei">Slowakei</option>
                        <option value="Slowenien">Slowenien</option>
                        <option value="Somalia">Somalia</option>
                        <option value="Spanien">Spanien</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="St. Kitts und Nevis">St. Kitts und Nevis</option>
                        <option value="St. Lucia">St. Lucia</option>
                        <option value="St. Vincent und die Grenadinen">St. Vincent und die Grenadinen</option>
                        <option value="Südafrika">Südafrika</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Südkorea">Südkorea</option>
                        <option value="Südsudan">Südsudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Syrien">Syrien</option>
                        <option value="Tadschikistan">Tadschikistan</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tansania">Tansania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-Leste">Timor-Leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad und Tobago">Trinidad und Tobago</option>
                        <option value="Tschad">Tschad</option>
                        <option value="Tschechien">Tschechien</option>
                        <option value="Tunesien">Tunesien</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Ungarn">Ungarn</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Usbekistan">Usbekistan</option>
                    </select>
                    <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                    }}>
                        ▼
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Staatsangehörigkeit</label>
                <div className="select-wrapper" style={{ position: 'relative' }}>
                    <select
                        value={formData.staatsangehoerigkeit}
                        onChange={(e) => handleRadioChange('staatsangehoerigkeit', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            appearance: 'none',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            backgroundColor: 'white'
                        }}
                    >
                        <option value="Deutschland">Deutschland</option>
                        <option value="Polen">Polen</option>
                        <option value="Rumänien">Rumänien</option>
                        <option value="Türkei">Türkei</option>
                        <option value="Österreich">Österreich</option>
                        <option value="Schweiz">Schweiz</option>
                        <option value="Frankreich">Frankreich</option>
                        <option value="Italien">Italien</option>
                        <option disabled>-------</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Ägypten">Ägypten</option>
                        <option value="Albanien">Albanien</option>
                        <option value="Algerien">Algerien</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua und Barbuda">Antigua und Barbuda</option>
                        <option value="Äquatorialguinea">Äquatorialguinea</option>
                        <option value="Argentinien">Argentinien</option>
                        <option value="Armenien">Armenien</option>
                        <option value="Aserbaidschan">Aserbaidschan</option>
                        <option value="Äthiopien">Äthiopien</option>
                        <option value="Australien">Australien</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesch">Bangladesch</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgien">Belgien</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivien">Bolivien</option>
                        <option value="Bosnien und Herzegowina">Bosnien und Herzegowina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brasilien">Brasilien</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgarien">Bulgarien</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                    </select>
                    <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                    }}>
                        ▼
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
                            position: 'absolute',
                            right: '-45px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer'
                        }}
                        onClick={() => toggleFieldInfo('staatsangehoerigkeit')}
                    >
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                    </div>
                </div>
            </div>

            {activeFieldInfo === 'staatsangehoerigkeit' && (
                <div style={{
                    marginTop: '10px',
                    padding: '15px',
                    backgroundColor: '#e9f3fc',
                    borderRadius: '5px',
                    color: '#00468c',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    <p style={{ margin: 0 }}>
                        <strong>Wichtig:</strong> Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt.
                    </p>
                </div>
            )}

            {formData.staatsangehoerigkeit !== 'Deutschland' && (
                <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px', backgroundColor: 'rgba(240, 248, 255, 0.2)' }}>
                    <h3 style={{ color: '#0e67b4', textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>
                        Genehmigungen bei ausländischen Bürgern
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>In Deutschland lebend seit</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="MM.JJJJ"
                                value={formData.inDeutschlandSeit}
                                onChange={(e) => handleRadioChange('inDeutschlandSeit', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px' }}>
                            Bitte geben Sie ein Datum an.
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Aufenthaltsgenehmigung befristet?</label>
                        <div className="radio-options">
                            <label className="radio-container" style={{ display: 'inline-block', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    name="aufenthaltsgenehmigungBefristet"
                                    value="ja"
                                    checked={formData.aufenthaltsgenehmigungBefristet === 'ja'}
                                    onChange={() => handleRadioChange('aufenthaltsgenehmigungBefristet', 'ja')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text" style={{ color: '#fff' }}>Ja</span>
                            </label>

                            <label className="radio-container" style={{ display: 'inline-block' }}>
                                <input
                                    type="radio"
                                    name="aufenthaltsgenehmigungBefristet"
                                    value="nein"
                                    checked={formData.aufenthaltsgenehmigungBefristet === 'nein'}
                                    onChange={() => handleRadioChange('aufenthaltsgenehmigungBefristet', 'nein')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text" style={{ color: '#fff' }}>Nein</span>
                            </label>
                        </div>

                        {formData.aufenthaltsgenehmigungBefristet === 'ja' && (
                            <div style={{ marginTop: '15px', position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Aufenthalt befristet bis"
                                    value={formData.aufenthaltserlaubnisBis || ''}
                                    onChange={(e) => handleRadioChange('aufenthaltserlaubnisBis', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '16px'
                                    }}
                                />
                                <div
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: '#aab6c0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        right: '10px',
                                        top: '12px'
                                    }}
                                    onClick={() => toggleFieldInfo('aufenthaltserlaubnisBis')}
                                >
                                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>i</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Arbeitserlaubnis befristet?</label>
                        <div className="radio-options">
                            <label className="radio-container" style={{ display: 'inline-block', marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    name="arbeitserlaubnisBefristet"
                                    value="ja"
                                    checked={formData.arbeitserlaubnisBefristet === 'ja'}
                                    onChange={() => handleRadioChange('arbeitserlaubnisBefristet', 'ja')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text" style={{ color: '#fff' }}>Ja</span>
                            </label>

                            <label className="radio-container" style={{ display: 'inline-block' }}>
                                <input
                                    type="radio"
                                    name="arbeitserlaubnisBefristet"
                                    value="nein"
                                    checked={formData.arbeitserlaubnisBefristet === 'nein'}
                                    onChange={() => handleRadioChange('arbeitserlaubnisBefristet', 'nein')}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="radio-text" style={{ color: '#fff' }}>Nein</span>
                            </label>
                        </div>

                        {formData.arbeitserlaubnisBefristet === 'ja' && (
                            <div style={{ marginTop: '15px', position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Erlaubnis befristet bis"
                                    value={formData.arbeitserlaubnisBis || ''}
                                    onChange={(e) => handleRadioChange('arbeitserlaubnisBis', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '16px'
                                    }}
                                />
                                <div
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: '#aab6c0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        right: '10px',
                                        top: '12px'
                                    }}
                                    onClick={() => toggleFieldInfo('arbeitserlaubnisBis')}
                                >
                                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>i</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button
                    className="btn btn-back"
                    onClick={goToPreviousStep}
                    disabled={isAnimating}
                    style={{ backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', flex: '1', maxWidth: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <span className="arrow-left" style={{ marginRight: '8px' }}>←</span> Geri
                </button>

                <button
                    className="btn btn-next"
                    onClick={goToNextStep}
                    disabled={isAnimating}
                    style={{ backgroundColor: '#ff9500', border: 'none', color: '#000', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', flex: '1', maxWidth: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    İleri <span className="arrow-right" style={{ marginLeft: '8px' }}>→</span>
                </button>
            </div>
        </div>
    );

    // 10. adım - Adres bilgileri
    const renderAddressStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
            <h1 className="form-title" style={{ color: 'white' }}>Adresse</h1>

            <div className="form-collapsible" onClick={toggleWarumInfo} style={{ cursor: 'pointer', marginBottom: '20px', backgroundColor: 'rgba(240, 248, 255, 0.1)', padding: '10px 15px', borderRadius: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'white', fontWeight: '500' }}>Warum fragen wir das?</span>
                    <span style={{ color: 'white', transform: warumInfoCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>▼</span>
                </div>

                {!warumInfoCollapsed && (
                    <div style={{
                        marginTop: '15px',
                        padding: '15px',
                        backgroundColor: 'rgba(242, 205, 131, 0.1)',
                        borderRadius: '5px',
                        color: 'white'
                    }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                            Ihre Adressdaten sind für den Kreditantrag erforderlich
                        </h4>
                        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'white' }}>
                            Für den Kreditantrag benötigen wir Ihre aktuelle Adresse. Diese wird für die Identitätsprüfung und zur Kommunikation mit Ihnen verwendet.
                        </p>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Wohnland</label>
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
                <label className="form-label" style={{ color: 'white' }}>Straße und Hausnummer</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. Musterstraße 123"
                        value={formData.strasse}
                        onChange={(e) => handleRadioChange('strasse', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.strasse ? 'none' : 'block' }}>
                    Bitte geben Sie Ihre Straße und Hausnummer an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Postleitzahl</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. 12345"
                        value={formData.plz}
                        onChange={(e) => handleRadioChange('plz', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.plz ? 'none' : 'block' }}>
                    Bitte geben Sie Ihre Postleitzahl an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Wohnort</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="z.B. Berlin"
                        value={formData.wohnort}
                        onChange={(e) => handleRadioChange('wohnort', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.wohnort ? 'none' : 'block' }}>
                    Bitte geben Sie Ihren Wohnort an.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Wohnhaft seit</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="MM/JJJJ"
                        value={formData.wohnhaftSeit}
                        onChange={(e) => handleRadioChange('wohnhaftSeit', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ color: '#f06', fontSize: '14px', marginTop: '5px', display: formData.wohnhaftSeit ? 'none' : 'block' }}>
                    Bitte geben Sie an, seit wann Sie an dieser Adresse wohnhaft sind.
                </div>
            </div>
        </div>
    );

    // 11. adım - Berufliche Tätigkeit (Mesleki Faaliyet)
    const renderProfessionalActivityStep = () => (
        <div className={`form-content ${getContentAnimationClass()}`}>
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

    // Mevcut adımları render eden fonksiyon - adım sayısını güncelliyoruz
    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return renderCreditApplicantsStep();
            case 2:
                return renderMaritalStatusStep();
            case 3:
                return renderHouseholdStep();
            case 4:
                return renderImmobilienStep();
            case 5:
                return renderExpensesStep();
            case 6:
                return renderIncomeStep();
            case 7:
                return renderLoadingStep();
            case 8:
                return renderContactStep();
            case 9:
                return renderPersonalDataStep();
            case 10:
                return renderAddressStep();
            case 11:
                return renderProfessionalActivityStep();
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
                        style={{ width: `${calculateProgress()}%`, backgroundColor: 'green' }}
                    >
                        <span className="progress-percentage">{calculateProgress()}%</span>
                    </div>
                </div>
            </div>

            {renderCurrentStep()}

            <div className="form-actions" style={{ display: step === 7 || step === 8 || step === 9 ? 'none' : 'flex' }}>
                <button
                    className="btn btn-back"
                    onClick={goToPreviousStep}
                    disabled={isAnimating}
                >
                    <span className="arrow-left">←</span> Geri
                </button>

                <button
                    className="btn btn-next"
                    onClick={goToNextStep}
                    disabled={isAnimating}
                >
                    İlerle <span className="arrow-right">→</span>
                </button>
            </div>

            <div className="security-info" style={{ display: step === 7 || step === 8 || step === 9 ? 'none' : 'flex' }}>
                <div className="lock-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path
                            fill="currentColor"
                            d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </svg>
                </div>
                <div className="security-text">
                    <p>Sichere SSL-Verschlüsselung</p>
                    <p>Ihre Daten werden mit modernster SSL-Technologie übertragen.</p>
                </div>
            </div>
        </div>
    );
};

export default CreditApplicationForm;