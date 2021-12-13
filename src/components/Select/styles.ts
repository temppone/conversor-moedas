import styled from "styled-components";

export const SelectContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const SelectInput = styled.select<{ inputError?: string }>`
    width: 100%;
    height: 4.2rem;
    padding: 1rem;
    border-radius: 0.4rem;
    transition: 0.1s;
    background: ${({ theme }) => theme.palette.input?.background};
    color: ${({ theme }) => theme.palette.text.primary};
    margin-top: 0.4rem;


    border: 0.1rem solid
        ${({ inputError }) =>
        inputError
            ? ({ theme }) => theme.palette.warning
            : ({ theme }) => theme.palette.input?.outline};

    :hover,
    :focus {
        outline: none;
        border-color: ${({ inputError }) =>
        inputError
            ? ({ theme }) => theme.palette.warning
            : ({ theme }) => theme.palette.input?.outlineHover};
        background: ${({ theme }) => theme.palette.input?.hover};
    }
`;

export const SelectOption = styled.option`
    color: ${({ theme }) => theme.palette.text.primary};
    `;
