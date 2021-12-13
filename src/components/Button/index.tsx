import React from 'react';

import { ButtonContainer, ButtonContent } from './styles';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    onClick?: () => void;
    backgroundLess?: boolean;
    svg?: JSX.Element;
}

const Button = ({
    name,
    onClick,
    backgroundLess,
    svg,
}: IButton): JSX.Element => {
    return (
        <ButtonContainer>
            <ButtonContent backgroundLess={backgroundLess} onClick={onClick}>
                {name}
                {svg}
            </ButtonContent>
        </ButtonContainer>
    );
};

export default Button;
