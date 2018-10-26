const initProcessor = require('./processor');
const expect = require('expect.js');
let processor;

describe('Java line counter', () => {
	before(() => {
		processor = initProcessor();
	});

	it('returns the current state when a new processor is initialised', () => {
		expect(processor.state).to.eql({
			count: 0,
		});
	});
});
