import React from 'react';
import './index.css';

const RowButtons = ({ options, multiple, onSelect, selectedOptions, disabledOptions }) => {
    const handleClick = (option) => {
        if (multiple) {
            onSelect(selectedOptions.includes(option)
                ? selectedOptions.filter((item) => item !== option)
                : [...selectedOptions, option]);
        } else {
            onSelect(option);
        }
    };

    return (
        <div className="row-buttons">
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`btn-option ${selectedOptions.includes(option.value) ? 'selected' : ''}`}
                    onClick={() => handleClick(option.value)}
                    disabled={disabledOptions.includes(option.value)}
                >
                    {option.label} {option.available !== undefined && `(${option.available})`}
                </button>
            ))}
        </div>
    );
};

export default RowButtons;
