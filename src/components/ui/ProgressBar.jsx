import React from 'react';
import PropTypes from 'prop-types';

// Simple horizontal progress bar
// Props:
//  - percentage: number (0-100)
//  - label: string (text to display inside bar)
//  - color: string (optional css color)
const ProgressBar = ({ percentage, label, color = 'green' }) => (
    <div className="progress-container">
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{ width: `${percentage}%`, backgroundColor: color }}
            >
                <span className="progress-percentage">{label}</span>
            </div>
        </div>
    </div>
);

ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
    label: PropTypes.string,
    color: PropTypes.string,
};

export default ProgressBar;
