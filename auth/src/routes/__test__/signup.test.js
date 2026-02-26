const request = require('supertest');
const app = require('../../app');

describe('User Signup', () => {
	it('responds with a status 201 after successful signup', async () => {
		const citizenId = '1234';
		const name = 'Ronaldo';
		const email = 'cr7@gmail.com';
		const pin = '1000';

		const response = await request(app)
			.post('/api/v1/auth/signup')
			.send({
				citizenId,
				name,
				email,
				pin,
			})
			.expect(201);

		// expect(response.get('Set-Cookie')).toBeDefined();
	});
});
