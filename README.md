# [shortname](https://github.com/moser-jose/shortname)

`shortname` is a JavaScript function designed to shorten names (Portuguese - PT 🇵🇹 | BR 🇧🇷 | AO 🇦🇴) in a simple and user-friendly way. The function allows users to quickly enter full names and receive abbreviated versions of those names in return.

[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT) 
[![Version](https://img.shields.io/github/package-json/v/moser-jose/shortname)](https://github.com/moser-jose/shortname)
[![npm](https://img.shields.io/npm/v/@mosmmy/shortname)](https://www.npmjs.com/package/@mosmmy/shortname)
[![npm downloads](https://img.shields.io/npm/dm/@mosmmy/shortname)](https://www.npmjs.com/package/@mosmmy/shortname)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)](https://www.typescriptlang.org/)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io/)
[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/moser-jose/shortname)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/moser-jose/shortname?style=social)](https://github.com/moser-jose/shortname/stargazers)

## Install

### yarn

`yarn add @mosmmy/shortname`

### NPM

`npm install @mosmmy/shortname`

### Use

```javascript

import { shortName } from '@mosmmy/shortname'

console.log(shortName('Jorge Pedro André dos Santos'))          //Jorge P. A. dos Santos

console.log(shortName('Pedro de Sousa André'))                  //Pedro de S. André

console.log(shortName('Marilda dos Santos Pedro de Souza'))     //Marilda dos S. P. de Souza

console.log(shortName('Marcos Ângelo Mateus dos Santos'))       //Marcos A. M. dos Santos
```

To run the test:

`npm run test`

`npm run test:coverage`

## Licence

This project is governed by the [MIT](/LICENSE.md). Just remember to be a nice person and send back any modifications, corrections or improvements. ✌️

## Author

| [<img src="https://avatars0.githubusercontent.com/u/8234620?" width="115"><br><sub>@moser-jose</sub>](https://github.com/moser-jose) |
| :---: |
