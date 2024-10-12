// src/events/subscribers/baseSubscriber.js
const { consumerOpts } = require('nats');

class Subscriber {
	constructor(subject, durableName, messageHandler) {
		this.subject = subject;
		this.durableName = durableName;
		this.messageHandler = messageHandler;
		this.deliverSubject = `${durableName}_deliver_subject`; // Consistent deliver_subject
	}

	async listen(natsClient) {
		console.log('Initializing JetStream manager...');
		const jetStreamManager = await natsClient.jetstreamManager();
		console.log('JetStream manager initialized successfully');

		console.log('Adding stream...');
		await jetStreamManager.streams.add({
			name: this.subject,
			subjects: [this.subject],
		});
		console.log('Stream added successfully');

		const opts = consumerOpts();
		opts.durable(this.durableName);
		opts.deliverAll();
		opts.manualAck();
		opts.deliverTo(this.deliverSubject); // Use consistent deliver_subject

		const subscription = await natsClient
			.jetstream()
			.subscribe(this.subject, opts);

		console.log(
			`Subscribed to JetStream subject: ${this.subject} with durable name: ${this.durableName}`
		);

		(async () => {
			for await (const msg of subscription) {
				try {
					const data = JSON.parse(msg.data);
					await this.messageHandler(data, msg);
					msg.ack(); // Acknowledge the message after successful processing
				} catch (error) {
					console.error(
						`Error processing ${this.subject} message:`,
						error
					);
				}
			}
		})().catch((err) => {
			console.error(`Subscription error for ${this.subject}:`, err);
		});
	}
}

module.exports = Subscriber;
