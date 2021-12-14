# Conversor de moedas
### O que é?

SPA mobile first desenvolvido em React.js

- O **Conversor de moedas** é um projeto que ajuda pessoas a converter moedas para a cotação atual.
- Na tela inicial o site apresenta um input e um select, ambos obrigatórios. Depois de preeche-los, é só clicar no botão de converter.
### Bibliotecas

As bibliotecas utilizadas foram:

- Para melhor separação do código e compatibilidade entre os navegadores foi utilizado [styled-component](https://styled-components.com/)
- Para fazer as rotas foi utilizado [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)
- Para manipulação de forms foi utilizado [react-hook-form](https://react-hook-form.com/), foi uma alternativa viável, uma vez que o form é bem simples. Além disso, foram utilizadas as bibliotecas [yup](https://github.com/jquense/yup) + [yup-locale-pt](https://www.npmjs.com/package/yup-locale-pt) para a validação do form, pois já existe uma integração entre as bibliotecas.
- Para testes e2e foi utilizada a biblioteca [cypress](https://cypress.io/)
- Apis utilizadas [Awesome API](https://economia.awesomeapi.com.br/).


### Como rodar o projeto

```
yarn para instalar os pacotes
yarn start para rodar o projeto
```
### Como rodar os testes com Cypress

```
yarn cy:open para iniciar via browser
yarn cy:run para iniciar no modo headless
```


### Demo

Demo [aqui](https://tempone-conversor.netlify.app/)
