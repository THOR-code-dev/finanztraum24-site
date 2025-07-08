import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore, selectStep, selectFormData, selectSubmissionStatus } from '../store/formStore';
import { motion, AnimatePresence } from 'framer-motion';
import './CreditApplicationForm.css';
import '../styles/design-system.css';
import ingLogo from '../assets/ing.jpg';
import santanderLogo from '../assets/santander.jpg';
import targobankLogo from '../assets/targobank.jpg';
import CreditApplicantsStep from './steps/CreditApplicantsStep';
import MaritalStatusStep from './steps/MaritalStatusStep';
import HouseholdStep from './steps/HouseholdStep';
import ImmobilienStep from './steps/ImmobilienStep';
import ExpensesStep from './steps/ExpensesStep';
import IncomeStep from './steps/IncomeStep';
import LoadingStep from './steps/LoadingStep';
import ContactStep from './steps/ContactStep';
import PersonalDataStep from './steps/PersonalDataStep';
import AddressStep from './steps/AddressStep';
import ProfessionalActivityStep from './steps/ProfessionalActivityStep';
import ExistingCreditsStep from './steps/ExistingCreditsStep';
import InsuranceStep from './steps/InsuranceStep';
import BankDetailsStep from './steps/BankDetailsStep';
import Notification from './ui/Notification';
import SubmittingOverlay from './ui/SubmittingOverlay';
import { isValidIBAN } from '../utils/iban';
import SubmissionSuccessStep from './steps/SubmissionSuccessStep';

const CreditApplicationForm = () => {
    const navigate = useNavigate();
    const step = useFormStore(selectStep);
    const formData = useFormStore(selectFormData);
    const updateFormData = useFormStore((s) => s.updateFormData);
    const nextStep = useFormStore((s) => s.nextStep);
    const prevStep = useFormStore((s) => s.prevStep);
    const setStep = useFormStore((s) => s.setStep);
    const submissionStatus = useFormStore(selectSubmissionStatus);
    const setSubmissionStatus = useFormStore((s) => s.setSubmissionStatus);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState(null);
    const [errorNotification, setErrorNotification] = useState('');
    const [ibanVerifyStatus, setIbanVerifyStatus] = useState('');
    const [ibanVerifyMessage, setIbanVerifyMessage] = useState('');
    const [infoCollapsed, setInfoCollapsed] = useState(false);
    const [warumInfoCollapsed, setWarumInfoCollapsed] = useState(true);
    const [warmMieteError, setWarmMieteError] = useState('');
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [activeFieldInfo, setActiveFieldInfo] = useState(null);
    const [warumInsuranceInfoCollapsed, setWarumInsuranceInfoCollapsed] = useState(true);
    const [warumBankInfoCollapsed, setWarumBankInfoCollapsed] = useState(true);

    // Animasyon varyantları
    const formVariants = {
        initial: (direction) => ({
            x: direction === 'next' ? 50 : -50,
            opacity: 0
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            x: direction === 'next' ? -50 : 50,
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        })
    };

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (formData.ibanPayout && formData.ibanPayout.length > 10) {
                setIbanVerifyStatus('blue');
                setIbanVerifyMessage('IBAN wird überprüft...');
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-iban`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ iban: formData.ibanPayout }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        if (data.isValid) {
                            setIbanVerifyStatus('green');
                            setIbanVerifyMessage(data.message); // Use message from API
                            updateFormData({ bankData: data.bankData }); // Save bank data
                        } else {
                            setIbanVerifyStatus('red');
                            setIbanVerifyMessage(data.message || 'IBAN ist ungültig.');
                            updateFormData({ bankData: null }); // Clear bank data
                        }
                    } else {
                        // API error. If balance depleted, fallback to local validation
                        if (data.code === 'BALANCE_DEPLETED' || (data.message && data.message.toLowerCase().includes('bakiye'))) {
                            if (isValidIBAN(formData.ibanPayout)) {
                                setIbanVerifyStatus('yellow');
                                setIbanVerifyMessage('Temel doğrulama başarılı, banka bilgisi alınamadı.');
                                updateFormData({ bankData: null });
                            } else {
                                setIbanVerifyStatus('red');
                                setIbanVerifyMessage('IBAN formatı geçersiz.');
                                updateFormData({ bankData: null });
                            }
                        } else {
                            setIbanVerifyStatus('red');
                            setIbanVerifyMessage(data.message || 'Fehler bei der Überprüfung.');
                            updateFormData({ bankData: null });
                        }
                    }
                } catch (error) {
                    setIbanVerifyStatus('red');
                    setIbanVerifyMessage('Überprüfung fehlgeschlagen.');
                    console.error('IBAN verification error:', error);
                    updateFormData({ bankData: null }); // Clear bank data on error
                }
            } else if (formData.ibanPayout) {
                setIbanVerifyStatus('');
                setIbanVerifyMessage('');
                updateFormData({ bankData: null }); // Clear bank data
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [formData.ibanPayout, updateFormData]);

    const handleRadioChange = (name, value) => {
        updateFormData({ [name]: value });


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
        const currentValue = formData[name] || 0;
        const newValue = operation === 'increment' ? currentValue + 1 : Math.max(0, currentValue - 1);

        const newKreditDetails = [...formData.kreditDetails];

        if (name === 'bestehendeKrediteAnzahl') {
            if (newValue > currentValue) {
                // Add a new empty detail object when counter increases
                newKreditDetails.push({ monatlicheRate: '', restschuld: '', abloesung: 'nein' });
            } else if (newValue < currentValue) {
                // Remove the last detail object when counter decreases
                newKreditDetails.pop();
            }
        }

        updateFormData({
            [name]: newValue,
            kreditDetails: newKreditDetails,
        });
    };

    const handleSubmit = async () => {
        if (ibanVerifyStatus !== 'green') {
            setErrorNotification('Bitte bestätigen Sie zuerst Ihre IBAN.');
            return;
        }

        setSubmissionStatus('submitting');
        setErrorNotification('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/save-application`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                updateFormData({ submissionId: result.submissionId });
                setSubmissionStatus('idle');
                navigate('/offers', { state: { amount: formData.kreditBetrag || 10000, term: formData.laufzeit || 60 } });
            } else {
                setErrorNotification(`Fehler: ${result.message}`);
                setSubmissionStatus('error');
            }
        } catch (error) {
            setErrorNotification('Ein Fehler ist beim Senden des Antrags aufgetreten.');
            setSubmissionStatus('error');
        }
    };

    // Zorunlu alan listesi adım bazlı
    const requiredFieldsByStep = {
        1: ['applicants'],
        2: ['maritalStatus'],
        3: ['adults', 'children', 'housingStatus'],
        4: ['immobilieArt', 'immobilieFlaeche', 'hasRentalProperty'],
        5: ['warmMiete'],
        6: ['berufsgruppe', 'nettoEinkommen'], // Income step
        7: [], // Loading step, no inputs
        8: ['anrede', 'vorname', 'nachname', 'telefon', 'email', 'datenschutz'], // Contact step
        9: ['geburtsdatum'], // Personal data minimal required, extend later
        10: ['wohnland', 'strasse', 'plz', 'wohnort', 'wohnhaftSeit'],
        11: ['firmaArbeitgeber', 'plzArbeitgeber', 'beschaeftigung'], // Professional activity
        12: [], // Existing credits (optional)
        13: [], // Insurance step currently optional
        14: ['ibanPayout', 'kontoinhaber'], // Bank details
    };

    const isFieldEmpty = (value) => value === undefined || value === null || value === '';

    const validateRequired = () => {
        const required = requiredFieldsByStep[step] || [];
        const missing = required.filter((f) => isFieldEmpty(formData[f]));
        if (missing.length) {
            setErrorNotification('Bitte füllen Sie alle Pflichtfelder aus.');
            return false;
        }
        return true;
    };

    const goToNextStep = () => {
        if (isAnimating) return;

        // Genel zorunlu alan kontrolü
        if (!validateRequired()) return;
        if (isAnimating) return;

        // Son adıma ulaşıldıysa işlem yapma (totalSteps = 14)
        if (step === 14) {
            console.log("Form tamamlandı! Form verisi:", formData);
            handleSubmit().then(() => {
                navigate('/offers', { state: { amount: formData.kreditBetrag || 10000, term: formData.laufzeit || 60 } });
            });
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
            } else {
                setWarmMieteError(''); // Hata yoksa temizle
            }
        }

        setAnimationDirection('next');
        setIsAnimating(true);
        setTimeout(() => {
            nextStep();
            setIsAnimating(false);
        }, 500);
    };

    const goToPreviousStep = () => {
        if (isAnimating || step === 1) return;
        setAnimationDirection('prev');
        setIsAnimating(true);
        setTimeout(() => {
            prevStep();
            setIsAnimating(false);
        }, 500);
    };



    // İlerleme çubuğu yüzdesini hesapla
    const calculateProgress = () => {
        // Toplam adım sayısı
        const totalSteps = 14;
        // Mevcut ilerleme yüzdesi
        return Math.min(100, (step / totalSteps) * 100);
    };

    // Form içeriğinin animasyon sınıfını belirle
    const getContentAnimationClass = () => {
        if (!isAnimating) return '';
        return animationDirection === 'next' ? 'form-section-exit-active' : 'form-section-enter-active';
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

    const toggleWarumInsuranceInfo = () => {
        setWarumInsuranceInfoCollapsed(prev => !prev);
    };

    const toggleWarumBankInfo = () => {
        setWarumBankInfoCollapsed(prev => !prev);
    };

    // 7. adımdan sonra 5 saniye sonra 8. adıma geçiş için useEffect ekleyelim
    useEffect(() => {
        if (step === 7) {
            const timer = setTimeout(() => {
                setStep(8); // Direk olarak setStep kullanarak 8. adıma geçiyoruz
                setAnimationDirection('next'); // Animasyon yönünü ayarlıyoruz
            }, 5000); // 5 saniye sonra

            return () => clearTimeout(timer); // Component unmount olduğunda timer'ı temizle
        }
    }, [step, setStep]);

    // Kredi detaylarını güncelleme fonksiyonu
    const handleCreditDetailChange = (index, field, value) => {
        const newDetails = [...formData.kreditDetails];
        if (!newDetails[index]) {
            newDetails[index] = {};
        }
        newDetails[index][field] = value;
        updateFormData({ kreditDetails: newDetails });
    };





    // Mevcut adımları render eden fonksiyon
    const renderCurrentStep = () => {
        // AnimatePresence ile adım geçişlerini animasyonlu yapalım
        return (
            <AnimatePresence mode="wait" custom={animationDirection}>
                <motion.div
                    key={step}
                    custom={animationDirection}
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="form-step-content"
                >
                    {step === 1 && <CreditApplicantsStep formData={formData} updateFormData={updateFormData} />}
                    {step === 2 && <MaritalStatusStep formData={formData} updateFormData={updateFormData} />}
                    {step === 3 && <HouseholdStep formData={formData} updateFormData={updateFormData} handleCounterChange={handleCounterChange} />}
                    {step === 4 && <ImmobilienStep formData={formData} updateFormData={updateFormData} />}
                    {step === 5 && <ExpensesStep formData={formData} updateFormData={updateFormData} warmMieteError={warmMieteError} />}
                    {step === 6 && <IncomeStep formData={formData} updateFormData={updateFormData} toggleWarumInfo={toggleWarumInfo} warumInfoCollapsed={warumInfoCollapsed} />}
                    {step === 7 && <LoadingStep />}
                    {step === 8 && <ContactStep formData={formData} updateFormData={updateFormData} />}
                    {step === 9 && <PersonalDataStep formData={formData} updateFormData={updateFormData} />}
                    {step === 10 && <AddressStep formData={formData} updateFormData={updateFormData} />}
                    {step === 11 && <ProfessionalActivityStep formData={formData} updateFormData={updateFormData} />}
                    {step === 12 && <ExistingCreditsStep formData={formData} updateFormData={updateFormData} handleCounterChange={handleCounterChange} handleCreditDetailChange={handleCreditDetailChange} />}
                    {step === 13 && <InsuranceStep formData={formData} updateFormData={updateFormData} toggleWarumInsuranceInfo={toggleWarumInsuranceInfo} warumInsuranceInfoCollapsed={warumInsuranceInfoCollapsed} />}
                    {step === 14 && <BankDetailsStep formData={formData} updateFormData={updateFormData} ibanVerifyStatus={ibanVerifyStatus} ibanVerifyMessage={ibanVerifyMessage} toggleWarumBankInfo={toggleWarumBankInfo} warumBankInfoCollapsed={warumBankInfoCollapsed} />}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="credit-application-form">
            {submissionStatus === 'submitting' && <SubmittingOverlay />}

            <div className="form-header">
                <div className="form-header-content">
                    <h1 className="form-title">Kredi Başvurusu</h1>
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
                        </div>
                        <div className="progress-text">{step}/14</div>
                    </div>
                </div>
            </div>

            <div className="form-content">
                {errorNotification && <Notification message={errorNotification} type="error" onClose={() => setErrorNotification('')} />}

                <motion.div
                    className="form-step"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderCurrentStep()}

                    <div className="form-navigation">
                        {step > 1 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="btn btn-secondary"
                                onClick={goToPreviousStep}
                            >
                                Geri
                            </motion.button>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            className="btn btn-primary"
                            onClick={goToNextStep}
                        >
                            {step === 14 ? 'Tamamla' : 'Devam'}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <div className="form-footer">
                <div className="partner-logos">
                    <img src={ingLogo} alt="ING Bank" className="partner-logo" />
                    <img src={santanderLogo} alt="Santander Bank" className="partner-logo" />
                    <img src={targobankLogo} alt="Targobank" className="partner-logo" />
                </div>
                <div className="security-info">
                    <span className="security-icon">🔒</span>
                    <span>Güvenli SSL bağlantısı ile verileriniz korunmaktadır</span>
                </div>
            </div>
        </div>
    );
};

export default CreditApplicationForm;