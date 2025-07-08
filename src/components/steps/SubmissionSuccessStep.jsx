import React from 'react';
import useFormStore from '../../store/formStore';

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const SubmissionSuccessStep = () => {
    const submissionId = useFormStore(state => state.formData.submissionId);

    return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#333' }}>
            <SuccessIcon />
            <h2 style={{ fontSize: '24px', margin: '20px 0 10px 0' }}>Antrag erfolgreich übermittelt!</h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6' }}>
                Ihre Angebote werden vorbereitet. Wir werden uns in Kürze mit Ihnen in Verbindung setzen.
            </p>
            {submissionId && (
                <p style={{ color: '#777', fontSize: '14px', marginTop: '30px', background: '#f7f7f7', padding: '10px', borderRadius: '5px' }}>
                    Ihre Antrags-ID: <strong>{submissionId}</strong>
                </p>
            )}
        </div>
    );
};

export default SubmissionSuccessStep;
