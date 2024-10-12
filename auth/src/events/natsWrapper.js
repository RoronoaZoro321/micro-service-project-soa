// natsWrapper.js
const { connect, StringCodec } = require('nats');

class NatsWrapper {
	constructor() {
		this._client = null;
		this._stringCodec = StringCodec();
		this._jetStream = null;
		this._pendingMessages = [];
		this._isConnected = false;
	}

	async connect() {
		if (this._client) {
			return;
		}
		try {
			if (!process.env.NATS_URL) {
				throw new Error('NATS_URL environment variable is not defined');
			}
			this._client = await connect({
				servers: process.env.NATS_URL.split(','),
				reconnect: true,
				maxReconnectAttempts: -1,
				reconnectTimeWait: 2000,
			});

			this._jetStream = this._client.jetstream();
			this._isConnected = true;
			console.log('Connected to NATS with JetStream enabled');

			// Set up status event listeners
			this._setupStatusListeners();

			// Flush any pending messages
			this._flushPendingMessages();
		} catch (error) {
			console.error('Failed to connect to NATS:', error);
			this._isConnected = false;
			setTimeout(() => this.connect(), 5000);
		}
	}

	async publish(subject, data) {
		const message = this._stringCodec.encode(JSON.stringify(data));

		if (!this._isConnected) {
			// Buffer the message
			this._pendingMessages.push({ subject, message });
			console.warn('NATS is not connected. Message buffered.');
			return;
		}

		try {
			console.log(this._jetStream);
			const pubAck = await this._jetStream.publish(subject, message);
			console.log(
				`Event published to JetStream subject: ${subject}, seq: ${pubAck.seq}`
			);
		} catch (err) {
			console.error(
				`Failed to publish message to subject ${subject}:`,
				err
			);
			// Buffer the message for retry
			this._pendingMessages.push({ subject, message });

			// If the error indicates a connection issue, update the connection status
			if (
				err.code === 'TIMEOUT' ||
				err.code === 'CONN_CLOSED' ||
				err.code === 'NATS_NOT_CONNECTED'
			) {
				this._isConnected = false;
				console.warn(
					'NATS publish failed due to connection issue. Setting _isConnected to false.'
				);
			}
		}
	}

	async _flushPendingMessages() {
		if (this._pendingMessages.length === 0) {
			return;
		}

		console.log('Waiting 5000ms before flushing pending messages...');
		await this._delay(5000); // Wait for 5000ms

		console.log('Flushing pending messages...');
		while (this._pendingMessages.length > 0) {
			const { subject, message } = this._pendingMessages.shift();
			this.publish(
				subject,
				JSON.parse(this._stringCodec.decode(message))
			);
		}
	}

	_delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	_setupStatusListeners() {
		(async () => {
			for await (const status of this._client.status()) {
				console.log(`NATS connection status: ${status.type}`);
				switch (status.type) {
					case 'disconnect':
						this._isConnected = false;
						console.warn('NATS disconnected');
						break;
					case 'reconnecting':
						this._isConnected = false;
						console.warn('NATS reconnecting');
						break;
					case 'reconnect':
						this._isConnected = true;
						console.log('NATS reconnected');
						break;
					case 'error':
						console.error('NATS error:', status.data);
						this._isConnected = false;
						break;
					case 'close':
						this._isConnected = false;
						console.warn('NATS connection closed');
						break;
					default:
						console.log(`NATS status: ${status.type}`);
				}
			}
		})().catch((err) => {
			console.error('Error handling NATS connection status:', err);
		});
	}

	close() {
		if (this._client) {
			this._client.close();
			console.log('NATS connection closed');
		}
	}
}

module.exports = new NatsWrapper();
