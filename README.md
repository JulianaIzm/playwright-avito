# AvitoTestAutomation

Autotests and framework for avito.ru

## Content:

- [Framework features](#framework-features)
- [Installation](#installation)
- [Starting tests](#starting-tests)


## Framework features

Framework contains:
- Page object classes for avito.ru pages
- Extendable element objects for input and announcement cards


## Installation

Install packages:
```
npm i
```
Install playwright browser:
```
npx playwright install chromium
```

## Starting tests

Headfull (debug mode):
```
npm run test:debug
```

Headless mode:
```
npm run test
```