/// <reference path="../support/index.d.ts" />


describe('Buscar endereço', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should convert value', () => {
        cy.findByText('Valor para converter').should('exist');
        cy.findByText('Informe o valor da moeda para conversão').should('exist');

        cy.findByText('Valor').should('exist').type('100');
        cy.getByDataCy('select-currency').select('BRL');
        cy.findByText('Converter').click();

        cy.findByText('Resultado da conversão').should('exist');
        cy.findByText('Resultado da conversão - Cotação do dia').should('exist');
        cy.findByText('Data da consulta').should('exist');
        cy.findByLabelText('USD').should('exist');
        cy.findByLabelText('EUR').should('exist');
    });

    it('should convert value', () => {
        cy.findByText('Valor para converter').should('exist');
        cy.findByText('Informe o valor da moeda para conversão').should('exist');

        cy.findByText('Valor').should('exist');
        cy.findByText('Converter').click();
        cy.findByText('O valor é obrigatório').should('exist');

        cy.findByText('Valor').type('123').should('exist');
        cy.getByDataCy('select-currency').select('Selecione uma opção');
        cy.findByText('Converter').click();
        cy.findByText('A moeda é obrigatória').should('exist');
    });
});
