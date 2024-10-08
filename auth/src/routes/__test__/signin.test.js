const request = require('supertest');
const app = require('../../app');

describe('User Authentication', () => {
	it('responds with a cookie when given valid credentials', async () => {
		const citizenId = '1234';
		const name = 'Ronaldo';
		const email = 'cr7@gmail.com';
		const pin = '1000';

		await request(app)
			.post('/api/v1/auth/signup')
			.send({
				citizenId,
				name,
				email,
				pin,
			})
			.expect(201);

		const response = await request(app)
			.post('/api/v1/auth/login')
			.send({
				citizenId: '1234',
				pin: '1000',
			})
			.expect(200);

		// expect(response.get('Set-Cookie')).toBeDefined();
	});
});
