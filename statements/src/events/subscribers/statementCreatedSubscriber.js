const { Subscriber } = require('@splaika/common');
const { addStatement } = require('../../controllers/controller');

class StatementCreatedSubscriber extends Subscriber {
	constructor() {
		super(
			'statement:created',
			'statement-created-durable',
			async (data, msg) => {
				try {
					await addStatement(data);
					msg.ack();
				} catch (error) {
					console.error(
						'Error handling statement:created event:',
						error
					);
				}
			}
		);
	}
}

module.exports = StatementCreatedSubscriber;
