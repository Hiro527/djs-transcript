# djs-transcript
[![NPM](https://nodei.co/npm/djs-transcript.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/djs-transcript/)\
[![CodeQL](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml)\
Transcipt Generator for Discord.js

Sample Page: https://hiro527.jp/djs-transcript/sample.html

# Important / 重要
 This library is currently in the development stage. Please keep an eye out for updates, as it is quite possible that unknown bugs or other issues may arise. We will try to fix bugs as soon as possible, but please understand that the developer is a student and time may not always be available.

 このライブラリは現在開発段階です。未知のバグやその他の問題を引き起こす可能性が十分あるため、常にアップデートに気を配っておいてください。可能な限り早急なバグ修正に取り掛かりますが、開発者が学生であるため時間がなかなか取れない場合があることをご了承ください。

# Usage / 使い方
## JavaScript
```js
const { transcript } = require('djs-transcript');
/* Discord.js Client Initialization*/
const filePath = await transcript(client, channel, 'Path-To-Output', 'Locale');
// transcript() will return the path to file
```

## TypeScript
```ts
import { transcript } from 'djs-transcript';
/* Discord.js Client Initialization*/
const filePath = await transcript(client, channel, 'Path-To-Output', 'Locale');
// transcript() will return the path to file
```
- `client` must be ready. / `client`はready状態である必要があります。
- `Locale` must be Unicode Locale Identifier. / `Locale`はUnicodeロケール識別子である必要があります。
- `Path-To-Output` should be full path. / `Path-to-Output`はフルパスを指定することをおすすめします。

# Contact / コンタクト
You can contact to me in both English and Japanese.\
連絡の際は日本語と英語のどちらでも大丈夫です。\
Discord: nullA1m#7777\
Twitter: [@nullA1m](https://twitter.com/nullA1m)