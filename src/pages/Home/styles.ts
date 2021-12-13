import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 500px;
        margin: 0 auto;
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        width: 500px;
    }
`;

export const ConvertForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
