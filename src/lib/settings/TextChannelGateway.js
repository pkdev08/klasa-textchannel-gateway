const { Gateway, Settings } = require('klasa');


/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
class TextChannelGateway extends Gateway {
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
			const channel = guild.channels.cache.filter((channel) => ['text'].includes(channel.type)).get(channelID);
			return channel && channel.settings;
		}

		return undefined;
	}

    /**
     * Create a new Settings for this gateway
     * @since 0.0.1
     * @param {*} target The holder for this Settings instance
     * @param {string} [id = `${target.guild.id}.${target.id}`] The id for this instance
     * @returns {external:Settings}
     */
     create(target, id = `${target[0]}.${target[1]}`) {
        return super.create(target, id);
    }


	/**
	 * Sync either all entries from the cache with the persistent database, or a single one.
	 * @since 0.0.1
	 * @param {(Array<string>|string)} [input=Array<string>] An object containing a id property, like discord.js objects, or a string
	 * @returns {?(ChannelGateway|external:Settings)}
	 */

}

module.exports = TextChannelGateway;