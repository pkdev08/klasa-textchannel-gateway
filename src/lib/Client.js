const { Client, Schema, util: { mergeDefault } } = require('klasa');
const { CLIENT } = require('./util/constants');
const TextChannelGateway = require('./settings/TextChannelGateway');
const NewsChannelGateway = require('./settings/NewsChannelGateway');
Client.defaultTextChannelSchema = new Schema();
module.exports = class extends Client {

	constructor(options) {
		super(options);
		this.constructor[Client.plugin].call(this);
	}

	static [Client.plugin]() {
		mergeDefault(CLIENT, this.options);
		const { channels } = this.options.gateways;
		channels.schema = 'schema' in channels ? channels.schema : this.constructor.defaultTextChannelSchema;
		this.gateways.register(new TextChannelGateway(this, 'channels', channels));
		this.gateways.register(new NewsChannelGateway(this, 'Newschannels', channels));

	}

};
