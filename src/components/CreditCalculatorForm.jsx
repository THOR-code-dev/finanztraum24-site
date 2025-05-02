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
        // Başvuru sayfasına yönlendir
        navigate('/application');
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
                    <form onSubmit={handleSubmit}>
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
                                <input
                                    type="text"
                                    value={formData.amount}
                                    onChange={handleManualAmountChange}
                                    className="manual-amount-input"
                                />
                                <span className="currency-symbol">€</span>
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
                                >
                                    <option value="vehicle">Autokredit</option>
                                    <option value="personal">Privatkredit</option>
                                    <option value="home">Wohnkredit</option>
                                    <option value="education">Bildungskredit</option>
                                    <option value="business">Geschäftskredit</option>
                                    <option value="vacation">Urlaubskredit</option>
                                    <option value="wedding">Hochzeitskredit</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Kreditvergleich starten
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreditCalculatorForm; 