# djs-transcript
[![NPM](https://nodei.co/npm/djs-transcript.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/djs-transcript/)\
[![CodeQL](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml)\
Transcript Generator for Discord.js\
Document: [English](https://hiro527.gitbook.io/djs-transcript-guide/) / [日本語](https://hiro527.gitbook.io/djs-transcript-guide-ja/)\
Sample Page: https://hiro527.jp/djs-transcript/sample.html

# User Disclaimer / ユーザー免責事項
 Before you use this library in your own Discord bot, you must let server members know that their messages can be transcriped as an file. This is very important to secure their privacy. You will be treated as you've agreed since download this library. And also, I won't be responsible about trouble that is caused by against this agreement.\
 このライブラリをDiscord botで使用する前に、サーバーメンバーに対してメッセージがログファイルとして転写されることを知らせておく必要があります。これは彼らのプライバシーを守るために非常に重要なことです。このライブラリをダウンロードした時点であなたはこれに同意したものと扱われます。また、開発者はこれに反したことにより発生するトラブルに関して一切の責任を負いかねます。

# Important / 重要
 This library is currently in the development stage. Please keep an eye out for updates, as it is quite possible that unknown bugs or other issues may arise. We will try to fix bugs as soon as possible, but please understand that the developer is a student and time may not always be available.

 このライブラリは現在開発段階です。未知のバグやその他の問題を引き起こす可能性が十分あるため、常にアップデートに気を配っておいてください。可能な限り早急なバグ修正に取り掛かりますが、開発者が学生であるため時間がなかなか取れない場合があることをご了承ください。

# Requirements / 必要事項
- Node.js: >= 16.6.0
- Discord.js: >= 13.0.0

# Installation / インストール方法
```bash
npm i djs-transcript
```

# Code Example / コード例
## JavaScript
```js
const Discord = require('discord.js');
const { transcript } = require('djs-transcript');

const client = new Discord.Client({
    intents: Discord.Intents.FLAGS.GUILDS | Discord.Intents.FLAGS.GUILD_MESSAGES | Discord.Intents.FLAGS.GUILD_MEMBERS
});

client.on('ready', async () => {
    console.log('Ready')
    const channel = client.channels.cache.get('ChannelID');
    const path = await transcript(client, channel, 'Path-to-output-directory', 'Locale');
    console.log(path);
})

client.login('DISCORD_TOKEN');
```

## TypeScript
```ts
import { Client, Intents } from 'discord.js';
import transcript from 'djs-transcript';

const client = new Client({
    intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES | Intents.FLAGS.GUILD_MEMBERS
});

client.on('ready', async () => {
    console.log('Ready')
    const channel = client.channels.cache.get('ChannelID');
    const path = await transcript(client, channel, 'Path-to-output-directory', 'Locale');
    console.log(path);
})

client.login('DISCORD_TOKEN');
```

- Locale must be Unicode Locale Identifier. / 指定するロケールはUnicodeロケール識別子である必要があります。
- `Path-To-Output` should be full path. / `Path-to-Output`はフルパスを指定することをおすすめします。

# Contact / コンタクト
You can contact to me in both English and Japanese.\
連絡の際は日本語と英語のどちらでも大丈夫です。\
Discord: Hiro527#7777\
Twitter: [@fps_Hiro527](https://twitter.com/fps_Hiro527)