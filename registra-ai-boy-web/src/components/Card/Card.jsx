import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, description, onSelect }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        if (!clicked) {
            onSelect(description); // Passa a descrição apenas se o card for selecionado
        }
    };

    return (
        <div
            className={`card ${clicked ? 'clicked' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleClick()}
        >
            <h3>{title}</h3>
        </div>
    );
};

export default Card;
