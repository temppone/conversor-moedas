const BASE_URL = 'https://economia.awesomeapi.com.br/last'

export const GET_RATES = (selectedCurrency: string, currencyOne: string, currencyTwo: string) => {
    return {
        url: `https://economia.awesomeapi.com.br/last/${currencyOne}-${selectedCurrency},${currencyTwo}-${selectedCurrency}`,

        options: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    };
}