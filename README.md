# djs-transcript
[![NPM](https://nodei.co/npm/djs-transcript.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/djs-transcript/)\
[![CodeQL](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml)\
Transcipt Generator for Discord.js
# Usage
## JavaScript
```js
const { transcript } = require('djs-transcript');
/* Discord.js Client Initialization*/
const filePath = await transcript(client, channel, 'Path-To-Write', 'Locale');
// transcript() will return the path to file
```

## TypeScript
```ts
import { transcript } from 'djs-transcript';
/* Discord.js Client Initialization*/
const filePath = await transcript(client, channel, 'Path-To-Write', 'Locale');
// transcript() will return the path to file
```

- Locale must be Unicode Locale Identifier.

# Contact
Discord: nullA1m#7777\
Twitter: [@nullA1m](https://twitter.com/nullA1m)