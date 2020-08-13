This repo/package is a port to the settings branch, the orginal repo can be found [Here](https://github.com/bannerbombs-klasa-plugins/klasa-textchannel-gateway)
# klasa-textchannel-gateway

Simple plugin to manage an efficient per-textchannel settings gateway.

## Note
Due to the News Channel this will be the last update as I no longer have a use for this package, as discord will add more channels it should be simple enough to update the package however the updates **may cause all the settings to be reset** which isn't ideal.


## Installation

```bash
# NPM
$ npm install shadow/klasa-textchannel-gateway
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
