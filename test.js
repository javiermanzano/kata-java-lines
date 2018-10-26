const initProcessor = require('./processor');
const expect = require('expect.js');
let processor;

describe('Java line counter', () => {
	beforeEach(() => {
		processor = initProcessor();
	});

	it('returns the current state when a new processor is initialised', () => {
		expect(processor.state).to.eql({
			count: 0,
		});
	});

	it('digests a single line', () => {
		processor.digest('public interface Dave {');
		expect(processor.state).to.eql({
			count: 1,
		});
	});

	it('digests two lines', () => {
		processor.digest('public interface Dave {');
		processor.digest('  private String getName() {');
		expect(processor.state).to.eql({
			count: 2,
		});
	});

	it('digests zero lines with one line comment', () => {
		processor.digest('// this is a comment');
		expect(processor.state).to.eql({
			count: 0,
		});
	});

});
