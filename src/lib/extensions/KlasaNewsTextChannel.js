const { Structures } = require('discord.js');

module.exports = Structures.extend('NewsChannel', NewsChannel => {
	/**
	 * Klasa's Extended NewsChannel
	 * @extends external:NewsChannel
	 */
	class KlasaNewsChannel extends NewsChannel {

		/**
		 * @typedef {external:NewsChannelJSON} NewsChannelJSON
		 * @property {external:SettingsJSON} settings The per channel settings
		 */

		/**
		 * @param {...*} args Normal D.JS TextChannel args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The channel level settings for this context (channel || default)
			 * @since 0.0.1
			 * @type {external:Settings}
			 */
			this.settings = this.client.gateways.get('channels').create([this.guild.id, this.id]);
		}

		/**
		 * Returns the JSON-compatible object of this instance.
		 * @since 0.5.0
		 * @returns {KlasaNewsChannel}
		 */
		toJSON() {
			return { ...super.toJSON(), settings: this.settings };
		}

	}

	return KlasaNewsChannel;
});
