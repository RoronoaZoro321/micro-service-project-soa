const { connect, StringCodec } = require('nats');

class NatsWrapper {
	constructor() {
		this._client = null;
		this._stringCodec = StringCodec();
	}

	async connect() {
		if (this._client) {
			return;
		}
		try {
			if (!process.env.NATS_URL) {
				throw new Error('NATS_URL environment variable is not defined');
			}
			this._client = await connect({ servers: [process.env.NATS_URL] });
			console.log('Connected to NATS');
		} catch (error) {
			console.error('Failed to connect to NATS:', error);
			throw error;
		}
	}

	publish(subject, data) {
		if (!this._client) {
			throw new Error('Cannot publish before connecting to NATS');
		}
		this._client.publish(
			subject,
			this._stringCodec.encode(JSON.stringify(data))
		);
		console.log(`Event published to subject: ${subject}`);
	}

	close() {
		if (this._client) {
			this._client.close();
			console.log('NATS connection closed');
		}
	}
}

module.exports = new NatsWrapper();
