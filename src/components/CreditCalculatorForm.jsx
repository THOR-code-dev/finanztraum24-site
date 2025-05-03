import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreditCalculatorForm.css';

const CreditCalculatorForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: 10000,
        term: 24,
        purpose: 'vehicle',
    });
    const [calculatedResults, setCalculatedResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAmountChange = (value) => {
        setFormData({
            ...formData,
            amount: Number(value),
        });
    };

    const handleManualAmountChange = (e) => {
        const value = e.target.value.replace(/[^\d]/g, ''); // Sadece rakamları kabul et
        if (value === '' || parseInt(value, 10) === 0) {
            setFormData({
                ...formData,
                amount: 1000, // Minimum değer
            });
        } else {
            const amount = Math.max(1000, parseInt(value, 10)); // En az 1000 olmalı
            setFormData({
                ...formData,
                amount,
            });
        }
    };

    const handleTermChange = (value) => {
        setFormData({
            ...formData,
            term: Number(value),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Event yayılımını durdur
        // Başvuru sayfasına yönlendir
        navigate('/application');
    };

    const handleQuickCompare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Faiz oranını kredinin amacına göre belirle
        let interestRate;
        switch(formData.purpose) {
            case 'vehicle':
                interestRate = 5.9;
                break;
            case 'personal':
                interestRate = 6.5;
                break;
            case 'home':
                interestRate = 4.8;
                break;
            case 'education':
                interestRate = 4.2;
                break;
            case 'business':
                interestRate = 7.5;
                break;
            case 'vacation':
                interestRate = 8.2;
                break;
            case 'wedding':
                interestRate = 7.8;
                break;
            default:
                interestRate = 6.0;
        }
        
        // Aylık faiz oranı (yıllık faiz / 12)
        const monthlyInterestRate = interestRate / 100 / 12;
        
        // Aylık taksit hesaplama formülü
        const monthlyPayment = formData.amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, formData.term) / (Math.pow(1 + monthlyInterestRate, formData.term) - 1);
        
        // Toplam geri ödeme
        const totalPayment = monthlyPayment * formData.term;
        
        // Toplam faiz
        const totalInterest = totalPayment - formData.amount;
        
        // Sonuçları ayarla
        setCalculatedResults({
            monthlyPayment: monthlyPayment,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
            interestRate: interestRate
        });
        
        // Sonuçları göster
        setShowResults(true);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    // Slider için sınırlandırılmış değer
    const sliderValue = Math.min(formData.amount, 100000);

    return (
        <div className="credit-calculator-form">
            <div className="form-container">
                <div className="form-step">
                    <div className="form-fields">
                        <div className="form-group">
                            <label>Kreditbetrag: {formatCurrency(formData.amount)}</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="1000"
                                    max="100000"
                                    step="1000"
                                    value={sliderValue}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    className="slider"
                                />
                                <div className="slider-labels">
                                    <span>1.000 €</span>
                                    <span>100.000 €</span>
                                </div>
                            </div>
                            <div className="manual-input-container">
                                <div className="input-with-currency">
                                    <input
                                        type="text"
                                        value={formData.amount}
                                        onChange={handleManualAmountChange}
                                        className="manual-amount-input"
                                    />
                                    <div className="currency-symbol-container">
                                        <span className="currency-symbol">€</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Laufzeit (Monate): {formData.term} Monate</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="6"
                                    max="60"
                                    step="6"
                                    value={formData.term}
                                    onChange={(e) => handleTermChange(e.target.value)}
                                    className="slider"
                                />
                                <div className="slider-labels">
                                    <span>6 Monate</span>
                                    <span>60 Monate</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Kreditzweck:</label>
                            <div className="select-wrapper">
                                <select
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="form-select"
                                    style={{ color: '#fff', backgroundColor: '#333', border: '1px solid #444' }}
                                >
                                    <option value="vehicle" style={{ backgroundColor: '#333', color: '#fff' }}>Autokredit</option>
                                    <option value="personal" style={{ backgroundColor: '#333', color: '#fff' }}>Privatkredit</option>
                                    <option value="home" style={{ backgroundColor: '#333', color: '#fff' }}>Wohnkredit</option>
                                    <option value="education" style={{ backgroundColor: '#333', color: '#fff' }}>Bildungskredit</option>
                                    <option value="business" style={{ backgroundColor: '#333', color: '#fff' }}>Geschäftskredit</option>
                                    <option value="vacation" style={{ backgroundColor: '#333', color: '#fff' }}>Urlaubskredit</option>
                                    <option value="wedding" style={{ backgroundColor: '#333', color: '#fff' }}>Hochzeitskredit</option>
                                </select>
                            </div>
                        </div>

                        {showResults && calculatedResults && (
                            <div className="results-summary">
                                <div className="result-header">Schnellberechnung Ergebnis</div>
                                <div className="result-item">
                                    <span className="result-label">Monatliche Rate:</span>
                                    <span className="result-value">{formatCurrency(calculatedResults.monthlyPayment)}</span>
                                </div>
                                <div className="result-item">
                                    <span className="result-label">Gesamtrückzahlung:</span>
                                    <span className="result-value">{formatCurrency(calculatedResults.totalPayment)}</span>
                                </div>
                                <div className="result-item">
                                    <span className="result-label">Gesamtzinsen:</span>
                                    <span className="result-value">{formatCurrency(calculatedResults.totalInterest)}</span>
                                </div>
                                <div className="result-item">
                                    <span className="result-label">Zinssatz:</span>
                                    <span className="result-value">{calculatedResults.interestRate}%</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="credit-buttons-container">
                        <button
                            onClick={handleSubmit}
                            className="credit-button primary-button"
                            aria-label="Kreditvergleich starten"
                        >
                            Kreditvergleich starten
                        </button>
                        
                        <button
                            onClick={handleQuickCompare}
                            className="credit-button secondary-button"
                            aria-label="Schnell vergleichen"
                        >
                            Schnell vergleichen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCalculatorForm; 