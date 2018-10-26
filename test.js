const { start } = require('./processor')();
const expect = require('expect.js');

describe('Java line counter', () => {
	it('returns an empty object when we start', () => {
		const response = start();
		expect(response).to.eql({});
	});
});
