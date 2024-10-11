class Subscriber {
	constructor(subject, queueGroupName, messageHandler) {
		this.subject = subject;
		this.queueGroupName = queueGroupName;
		this.messageHandler = messageHandler;
	}

	async listen(natsClient, stringCodec) {
		const subscriptionOptions = {
			queue: this.queueGroupName,
		};

		const subscription = natsClient.subscribe(
			this.subject,
			subscriptionOptions
		);

		console.log(
			`Subscribed to ${this.subject} with queue group ${this.queueGroupName}`
		);

		(async () => {
			for await (const msg of subscription) {
				try {
					const data = JSON.parse(stringCodec.decode(msg.data));
					await this.messageHandler(data, msg);
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
