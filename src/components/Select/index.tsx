import React from 'react'
import { InputWarning } from '../Input/styles'
import { SelectContainer, SelectInput, SelectOption } from './styles'

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: IOption[];
    inputError?: string;
    label: string;
}

interface IOption {
    value?: string;
    label?: string;
    code?: string;
    name?: string;
}

const Select = ({ options, inputError, label, ...props }: ISelect) => {
    return (
        <SelectContainer>
            <label>
                {label}
            </label>
            <SelectInput
                data-cy="select-currency"
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
            <InputWarning>{inputError}</InputWarning>
        </SelectContainer>
    )
}

export default Select
