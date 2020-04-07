This repo/package is a port to the settings branch, the orginal repo can be found [Here](https://github.com/bannerbombs-klasa-plugins/klasa-textchannel-gateway)
# klasa-textchannel-gateway

Simple plugin to manage an efficient per-textchannel settings gateway.

## Installation

```bash
# NPM
$ npm install --save @shadow/klasa-textchannel-gateway
```
## Setup

```js
const { Client } = require('klasa');

Client.use(require('@shadow/klasa-textchannel-gateway'));

// Modifying the Schema
Client.defaultTextChannelSchema
    .add('experience', 'integer', { default: 0 })
    .add('level', 'integer', { default: 0 });
```
