const { Gateway, Settings } = require('klasa');


/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
class NewsChannelGateway extends Gateway {
	/**
	 * The Settings that this class should make.
	 * @since 0.0.1
	 * @type {external:Settings}
	 * @readonly
	 * @private
	 */
 get Settings() {
		return Settings;
	}

	/**
	 * The ID length for all entries.
	 * @since 0.0.1
	 * @type {number}
	 * @readonly
	 * @private
	 */
	get idLength() {
		// 18 + 1 + 18: `{GUILDID}.{TEXTCHANNELID}`
		return 37;
	}

	/**
	 * Get a Settings entry from this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for this instance
	 * @returns {?external:Settings}
	 */
	get(id) {
		const [guildID, channelID] = typeof id === 'string' ? id.split('.') : id;

		const guild = this.client.guilds.cache.get(guildID);
		if (guild) {
			const channel = guild.channels.cache.filter((channel) => ['news'].includes(channel.type)).get(channelID);
			return channel && channel.settings;
		}

		return undefined;
	}

	/**
	 * Create a new Settings for this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for this instance
	 * @param {Object<string, *>} [data={}] The data for this Settings instance
	 * @returns {external:Settings}
	 */
	create(id, data = {}) {
		const [guildID, channelID] = typeof id === 'string' ? id.split('.') : id;
		const entry = this.get([guildID, channelID]);
		if (entry) return entry;
		const settings = new this.Settings(this, { id: `${guildID}.${channelID}`, ...data });
		if (this._synced) settings.sync();
		return settings;
	}

	/**
	 * Sync either all entries from the cache with the persistent database, or a single one.
	 * @since 0.0.1
	 * @param {(Array<string>|string)} [input=Array<string>] An object containing a id property, like discord.js objects, or a string
	 * @returns {?(NewsChannelGateway|external:Settings)}
	 */

}

module.exports = NewsChannelGateway;
