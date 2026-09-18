# [shortname](https://github.com/moser-jose/shortname)

`shortname` is a tiny, dependency-free TypeScript/JavaScript function that shortens full names in a simple and user-friendly way. Give it a full name and get back an abbreviated version, keeping the first and last names and turning the middle ones into initials, or choose exactly which names to abbreviate.

```javascript
shortName('Ana Beatriz Costa Lima') // Ana B. C. Lima
```

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

## Features

- Keeps the first and last names and abbreviates the ones in between.
- Lets you choose which names to abbreviate by position.
- Cleans the input: removes digits, symbols and extra spaces, and normalizes capitalization.
- Removes accents from initials (`Ângelo` becomes `A.`) and keeps them in complete names.
- Written in TypeScript, ships its own type declarations.
- No runtime dependencies, 100% test coverage.

## Install

### npm

```bash
npm install @mosmmy/shortname
```

### yarn

```bash
yarn add @mosmmy/shortname
```

### pnpm

```bash
pnpm add @mosmmy/shortname
```

## Quick start

The package is an ES module and exports a single named function, `shortName`:

```javascript
import { shortName } from '@mosmmy/shortname'

shortName('Maria da Conceição Santos Pereira') // Maria da C. S. Pereira
shortName('john james doe') // John J. Doe
shortName('Ana Beatriz Costa Lima', 1) // A. Beatriz Costa Lima
```

With TypeScript no extra setup is needed, the types are included.

## API

```typescript
shortName(fullName: string, ...positions: Array<number | number[]>): string | undefined
```

| Parameter   | Description                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `fullName`  | The full name to shorten.                                                                                                      |
| `positions` | Optional. The positions (starting at `1`) of the names to abbreviate, up to 6. Pass them as separate arguments or as an array. |

**Returns** the shortened name, or `undefined` when there is nothing to shorten:

- `fullName` is not a string (`undefined`, `null`, a number, etc.);
- `fullName` has no letters (empty, only spaces, only digits or symbols).

## Default behavior (only the name)

When only the name is passed, the **first and last names are kept** and every name in between is abbreviated:

```javascript
shortName('Ana Beatriz Costa Lima') // Ana B. C. Lima
shortName('José Eduardo dos Santos') // José E. dos Santos
shortName('Carlos Eduardo de Almeida Ferreira') // Carlos E. de A. Ferreira
shortName('Pedro de Sousa André') // Pedro de S. André
shortName('Marilda dos Santos Pedro de Souza') // Marilda dos S. P. de Souza
shortName('Marcos Ângelo Mateus dos Santos') // Marcos A. M. dos Santos
shortName('John Doe') // John Doe
shortName('Agostinho Neto') // Agostinho Neto
shortName('João') // João
```

## Choosing which names are abbreviated

Pass the positions of the names you want to abbreviate after the name. `1` is the first name, `2` the second, `3` the third, and so on. Only the given positions are abbreviated, all the others stay complete.

```javascript
shortName('Ana Beatriz Costa Lima', 1) // A. Beatriz Costa Lima
shortName('Ana Beatriz Costa Lima', 2) // Ana B. Costa Lima
shortName('Ana Beatriz Costa Lima', 1, 2, 3) // A. B. C. Lima
shortName('Ana Beatriz Costa Lima', 1, 4) // A. Beatriz Costa L.
shortName('Carlos Eduardo de Almeida Ferreira', 2) // Carlos E. de Almeida Ferreira
shortName('John Doe', 2) // John D.
```

The positions can also be passed as an array (or mixed with separate numbers):

```javascript
shortName('Ana Beatriz Costa Lima', [1, 2, 3]) // A. B. C. Lima
shortName('Carlos Eduardo de Almeida Ferreira', [1], 4) // C. Eduardo de Almeida F.
```

Rules:

- **Prepositions are never abbreviated and are not counted.** The prepositions are `de`, `do`, `dos`, `da`, `das` and `e`. In `Pedro de Sousa André`, `Sousa` is the 2nd name and `André` the 3rd:

  ```javascript
  shortName('Pedro de Sousa André', 2) // Pedro de S. André
  shortName('Pedro de Sousa André', 1, 2, 3) // P. de S. A.
  shortName('Maria da Conceição Santos Pereira', 3) // Maria da Conceição S. Pereira
  ```

- **At most 6 positions** are used, whether passed separately or in an array. Extra ones are ignored:

  ```javascript
  shortName('Ana Bia Caio Davi Fred Gil Hugo Ivo', 1, 2, 3, 4, 5, 6, 7) // A. B. C. D. F. G. Hugo Ivo
  ```

- **Invalid positions are ignored**: `0`, negative numbers, decimals, and positions greater than the number of names.

  ```javascript
  shortName('John James Doe', 0, -1, 1.5, 9) // John James Doe
  ```

- **When positions are given, the default behavior no longer applies**: the first and last names are abbreviated only if you ask for them. An empty array (`[]`) counts as no positions, so the default behavior is used.

## Edge cases and input cleaning

The input is cleaned before shortening:

| Input                                    | Output              | What happened                                                 |
| ---------------------------------------- | ------------------- | ------------------------------------------------------------- |
| `'  John   James  Doe  '`                | `John J. Doe`       | Extra spaces are removed.                                     |
| `'Mário Pedro4 António'`                 | `Mário P. António`  | Digits and symbols are removed.                               |
| `'Julia Ward Howe 1819-1910'`            | `Julia W. Howe`     | Words made only of digits/symbols are dropped.                |
| `'jOsÉ'`                                 | `José`              | Names are capitalized, the rest is lowercased.                |
| `'Ângelo de Jesus Mateus de Almeida'`    | `Ângelo de J. M. de Almeida` | Accents are kept in complete names.                  |
| `'Maria DA Silva'`                       | `Maria da Silva`    | Prepositions are always lowercase.                            |
| `'Ângelo Mateus Silva', 1`               | `A. Mateus Silva`   | Accents are removed from initials.                            |
| `' de da João Pedro dos Santos'`         | `De da J. P. dos Santos` | The first word is always treated as a name, even if it looks like a preposition. The same goes for the last word. |
| `''`, `'   '`, `'12345'`                 | `undefined`         | No letters, nothing to shorten.                               |
| `undefined`, `null`, `123`               | `undefined`         | Not a string.                                                 |

## Development

```bash
git clone https://github.com/moser-jose/shortname.git
cd shortname
npm install
```

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run build`         | Compile TypeScript to `dist/`.           |
| `npm test`              | Run the tests.                           |
| `npm run test:watch`    | Run the tests in watch mode.             |
| `npm run test:coverage` | Run the tests with a coverage report.    |
| `npm run lint`          | Lint the source with ESLint.             |
| `npm run lint:fix`      | Lint and fix what can be fixed.          |
| `npm run format`        | Format the source with Prettier.         |

## Contributing

Issues and pull requests are welcome at [github.com/moser-jose/shortname](https://github.com/moser-jose/shortname/issues). Please add or update tests for any change and make sure `npm run test:coverage` stays at 100%.

## License

This project is governed by the [MIT](/LICENSE.md). Just remember to be a nice person and send back any modifications, corrections or improvements. ✌️

## Author

| [<img src="https://avatars0.githubusercontent.com/u/8234620?" width="115"><br><sub>@moser-jose</sub>](https://github.com/moser-jose) |
| :---: |
