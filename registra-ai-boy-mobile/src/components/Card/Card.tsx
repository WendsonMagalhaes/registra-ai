import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import stylesCard from "./Card.styles";

interface CardProps {
    title: string;
    description: string;
    onSelect: (description: string) => void;
}

const Card: React.FC<CardProps> = ({ title, description, onSelect }) => {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);

    const handlePress = () => {
        setSelected(!selected);
        if (!selected) {
            onSelect(description);
        }
    };

    return (
        <Pressable
            style={[
                stylesCard.card,
                selected && stylesCard.cardSelected,
                hovered && stylesCard.cardHover,
            ]}
            onPress={handlePress}
            onHoverIn={() => setHovered(true)} // Efeito hover no Web
            onHoverOut={() => setHovered(false)} // Efeito hover no Web
            onPressIn={() => setHovered(true)} // Efeito de toque no Mobile
            onPressOut={() => setHovered(false)} // Remove efeito de toque no Mobile
        >
            <Text style={stylesCard.title}>{title}</Text>
        </Pressable>
    );
};

export default Card;
