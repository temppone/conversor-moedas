import React from 'react'
import { SelectContainer, SelectInput, SelectOption } from './styles'

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: IOption[];
    inputError?: string;
}

interface IOption {
    value?: string;
    label?: string;
    code?: string;
    name?: string;
}

const Select = ({ options, inputError, ...props }: ISelect) => {
    return (
        <SelectContainer>
            <SelectInput
                inputError={inputError}
                {...props}
            >
                <SelectOption selected value='0'>
                    Selecione uma opção
                </SelectOption>
                {options.map((option) => (
                    <SelectOption
                        key={option.value}
                        value={option.code}>
                        {option.label}
                    </SelectOption>
                ))}
            </SelectInput>
        </SelectContainer>
    )
}

export default Select
