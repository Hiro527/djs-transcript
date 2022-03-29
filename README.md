# djs-transcript
[![NPM](https://nodei.co/npm/djs-transcript.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/djs-transcript/)\
[![CodeQL](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Hiro527/djs-transcript/actions/workflows/codeql-analysis.yml)\
Transcipt Generator for Discord.js

Sample Page: https://hiro527.jp/djs-transcript/sample.html

# User Disclaimer / ユーザー免責事項
 Before you use this library in your own Discord bot, you must let server members know that their messages can be transcriped as an file. This is very important to secure their privacy. You will be treated as you've agreed since download this library. And also, I won't be responsible about trouble that is caused by against this agreement.\
 このライブラリをDiscord botで使用する前に、サーバーメンバーに対してメッセージがログファイルとして転写されることを知らせておく必要があります。これは彼らのプライバシーを守るために非常に重要なことです。このライブラリをダウンロードした時点であなたはこれに同意したものと扱われます。また、開発者はこれに反したことにより発生するトラブルに関して一切の責任を負いかねます。

# Important / 重要
 This library is currently in the development stage. Please keep an eye out for updates, as it is quite possible that unknown bugs or other issues may arise. We will try to fix bugs as soon as possible, but please understand that the developer is a student and time may not always be available.

 このライブラリは現在開発段階です。未知のバグやその他の問題を引き起こす可能性が十分あるため、常にアップデートに気を配っておいてください。可能な限り早急なバグ修正に取り掛かりますが、開発者が学生であるため時間がなかなか取れない場合があることをご了承ください。

# v0.4.0
- Fixed an issue that it throws an error when last message was deleted. / 最後に送信されたメッセージが削除された場合に出るエラーを修正しました。
- Fixed some styles for embeds. / embedのスタイルを修正しました。
- Now, all timestamps are compatible with I18n. / すべてのタイムスタンプをI18nに対応しました。
- Unix Timestamp is supported. / Unixタイムスタンプに対応しました。
- Deleted user/channel/role are supported. / 削除されたユーザー/チャンネル/ロールの表示に対応しました。
- Fixed an issue that url in embeds hadn't shown as hyper link. / embed内のurlがハイパーリンクとして表示されない問題を修正しました。
- Fixed an issue that markdown in fields hadn't been parsed. / field無いのマークダウンがパースされていない問題を修正しました。

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