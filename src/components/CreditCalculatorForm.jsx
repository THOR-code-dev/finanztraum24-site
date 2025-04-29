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
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="credit-calculator-form">
            <div className="form-container">
                <div className="form-step">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Kredi Miktarı: {formatCurrency(formData.amount)}</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="1000"
                                    max="100000"
                                    step="1000"
                                    value={formData.amount}
                                    onChange={(e) => handleAmountChange(e.target.value)}
                                    className="slider"
                                />
                                <div className="slider-labels">
                                    <span>1.000 ₺</span>
                                    <span>100.000 ₺</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Vade (Ay): {formData.term} ay</label>
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
                                    <span>6 ay</span>
                                    <span>60 ay</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Kredi Amacı:</label>
                            <div className="select-wrapper">
                                <select
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="vehicle">Araç Kredisi</option>
                                    <option value="personal">İhtiyaç Kredisi</option>
                                    <option value="home">Konut Kredisi</option>
                                    <option value="education">Eğitim Kredisi</option>
                                    <option value="business">İşletme Kredisi</option>
                                    <option value="vacation">Tatil Kredisi</option>
                                    <option value="wedding">Düğün Kredisi</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Kredi Karşılaştırmasını Başlat
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreditCalculatorForm; 