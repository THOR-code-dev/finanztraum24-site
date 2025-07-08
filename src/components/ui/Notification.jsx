import React from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    const icon = type === 'success' ? '✓' : '✗';

    return (
        <div className={`notification-overlay`}>
            <div className={`notification-box notification-${type}`}>
                <div className="notification-icon">{icon}</div>
                <div className="notification-content">
                    <p>{message}</p>
                </div>
                <button onClick={onClose} className="notification-close-btn">&times;</button>
            </div>
        </div>
    );
};

export default Notification;
