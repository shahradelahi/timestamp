# @se-oss/timestamp

[![CI](https://github.com/shahradelahi/timestamp/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/timestamp/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/timestamp.svg)](https://www.npmjs.com/package/@se-oss/timestamp)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@se-oss/timestamp)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/timestamp)](https://packagephobia.com/result?p=@se-oss/timestamp)

_@se-oss/timestamp_ is a library for parsing and formatting time durations in **milliseconds** and **seconds**. It provides a clear and type-safe API for converting human-readable time strings into numerical values and vice-versa.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/timestamp
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/timestamp
```

**yarn**

```bash
yarn add @se-oss/timestamp
```

</details>

## 📖 Usage

The library provides two main functions: `ms` (and its alias `millis`) for millisecond conversions, and `sec` (and its alias `seconds`) for second conversions. Both functions can parse strings into numbers and format numbers into strings.

### Milliseconds (`ms`, `millis`)

```ts
import { millis, ms } from '@se-oss/timestamp';

// Parsing strings to milliseconds
ms('2 days'); // 172800000
ms('1d'); // 86400000
ms('10h'); // 36000000
ms('2.5 hrs'); // 9000000
ms('2h'); // 7200000
ms('1m'); // 60000
ms('5s'); // 5000
ms('1y'); // 31557600000
ms('100'); // 100 (defaults to milliseconds if no unit)
ms('-3 days'); // -259200000

// Formatting milliseconds to strings
ms(60000); // "1m"
ms(2 * 60000); // "2m"
ms(-3 * 60000); // "-3m"
ms(ms('10 hours')); // "10h"

// Formatting with long format
ms(60000, { long: true }); // "1 minute"
ms(2 * 60000, { long: true }); // "2 minutes"
ms(-3 * 60000, { long: true }); // "-3 minutes"
ms(ms('10 hours'), { long: true }); // "10 hours"

// Using the alias
millis('1h'); // 3600000
millis(3600000); // "1h"
```

### Seconds (`sec`, `seconds`)

```ts
import { sec, seconds } from '@se-oss/timestamp';

// Parsing strings to seconds
sec('2 days'); // 172800
sec('1d'); // 86400
sec('10h'); // 36000
sec('2.5 hrs'); // 9000
sec('2h'); // 7200
sec('1m'); // 60
sec('5s'); // 5
sec('1y'); // 31557600
sec('100'); // 100 (defaults to seconds if no unit)
sec('500ms'); // 0.5 (parses milliseconds into fractional seconds)
sec('-3 days'); // -259200

// Formatting seconds to strings
sec(60); // "1m"
sec(2 * 60); // "2m"
sec(-3 * 60); // "-3m"
sec(sec('10 hours')); // "10h"
sec(0.5); // "500ms" (formats fractional seconds into milliseconds)

// Formatting with long format
sec(60, { long: true }); // "1 minute"
sec(2 * 60, { long: true }); // "2 minutes"
sec(-3 * 60, { long: true }); // "-3 minutes"
sec(sec('10 hours'), { long: true }); // "10 hours"
sec(0.5, { long: true }); // "500 ms"

// Using the alias
seconds('1h'); // 3600
seconds(3600); // "1h"
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/timestamp).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/timestamp)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/timestamp/graphs/contributors).
