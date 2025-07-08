import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaChild } from 'react-icons/fa';

// Renders n person icons (adult or child)
const PeopleFigures = ({ count, type }) => {
    const figureClass = type === 'adults' ? 'adult-figure' : 'child-figure';
    const Icon = type === 'adults' ? FaUser : FaChild;

    return (
        <div className="figures-container">
            {Array.from({ length: count }, (_, i) => (
                <div key={`${type}-${i}`} className={`person-figure ${figureClass}`}>
                    <Icon size={18} color={type === 'adults' ? '#000000' : '#000000'} />
                </div>
            ))}
        </div>
    );
};

PeopleFigures.propTypes = {
    count: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['adults', 'children']).isRequired,
};

export default PeopleFigures;
