# djs-transcript
Transcipt Generator for Discord.js
# Usage
```js
const { transcript } = require('djs-transcript');
/* Discord.js Client Initialization*/
const filePath = await transcript(client, channel, 'Path-To-Write', 'ja');
// transcript() will return the path to file
```