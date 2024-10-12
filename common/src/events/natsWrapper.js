// natsWrapper.js
const { connect, StringCodec } = require('nats');
const Event = require('../models/eventModel');

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
			// Save the event to MongoDB as a plain string (encoded)
			try {
				const event = new Event({
					subject,
					message: JSON.stringify(data),
				});
				await event.save();
				console.warn('NATS is not connected. Event saved to MongoDB.');
			} catch (err) {
				console.error('Failed to save event to MongoDB:', err);
			}
			return;
		}

		try {
			const pubAck = await this._jetStream.publish(subject, message);
			console.log(
				`Event published to JetStream subject: ${subject}, seq: ${pubAck.seq}`
			);
		} catch (err) {
			console.error(
				`Failed to publish event to subject ${subject}:`,
				err
			);

			// Save the event to MongoDB for retry later
			try {
				const event = new Event({
					subject,
					message: JSON.stringify(data),
				});
				await event.save();
				console.warn('Event saved to MongoDB for retry.');
			} catch (mongoErr) {
				console.error('Failed to save event to MongoDB:', mongoErr);
			}

			// Handle connection issues
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
		console.log('Checking MongoDB for pending events...');

		try {
			const pendingEvents = await Event.find();

			if (pendingEvents.length === 0) {
				console.log('No pending events found in MongoDB.');
				return;
			}

			console.log('Flushing pending events from MongoDB...');

			for (const event of pendingEvents) {
				const { subject, message } = event;
				const encodedMessage = this._stringCodec.encode(message);
				try {
					await this._jetStream.publish(subject, encodedMessage);
					await Event.deleteOne({ _id: event._id }); // Remove from MongoDB after successful publish
					console.log(`Flushed event to subject: ${subject}`);
				} catch (err) {
					console.error(
						`Failed to publish buffered event for subject ${subject}:`,
						err
					);
				}
			}
		} catch (err) {
			console.error('Failed to flush pending events from MongoDB:', err);
		}
	}

	_delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	_setupStatusListeners() {
		(async () => {
			for await (const status of this._client.status()) {
				switch (status.type) {
					case 'disconnect':
						this._isConnected = false;
						console.warn('NATS disconnected');
						break;
					case 'reconnect':
						this._isConnected = true;
						console.log('NATS atempt reconnecting...');

						// Close the existing connection to ensure a clean restart
						if (this._client) {
							this._client.close();
						}
						break;

					default:
						break;
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
