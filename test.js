const initProcessor = require('./processor');
const expect = require('expect.js');
let processor;

describe('Java line counter', () => {
	const validLine = 'public interface Dave {}';
	const lineComment = '// This is a comment';

	beforeEach(() => {
		processor = initProcessor();
	});

	it('returns the current state when a new processor is initialised', () => {
		expect(processor.state).to.eql({
			count: 0,
		});
	});

	it('digests a single line', () => {
		processor.digest(validLine);
		expect(processor.state).to.eql({
			count: 1,
		});
	});

	it('digests two lines', () => {
		processor.digest(validLine);
		processor.digest(validLine);
		expect(processor.state).to.eql({
			count: 2,
		});
	});

	it('digests zero lines with one line comment', () => {
		processor.digest(lineComment);
		expect(processor.state).to.eql({
			count: 0,
		});
	});
});
