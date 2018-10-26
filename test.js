const initProcessor = require('./processor');
const expect = require('expect.js');
let processor;

describe('Java line counter', () => {
	const validLine = 'public interface Dave {}';
	const lineComment = '// This is a comment';
	const blockComment = {
		oneLine: '/* This is a comment */'
	};

	beforeEach(() => {
		processor = initProcessor();
	});

	describe('Basic use cases', () => {
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
	});

	describe('Line comment cases', () => {
		it('digests zero lines with one line comment', () => {
			processor.digest(lineComment);
			expect(processor.state).to.eql({
				count: 0,
			});
		});

		it('digests one line with one line comment', () => {
			processor.digest(lineComment);
			processor.digest(validLine);
			expect(processor.state).to.eql({
				count: 1,
			});
		});

		it('digests a mix of line comments with valid lines', () => {
			processor.digest(lineComment);
			processor.digest(validLine);
			processor.digest(validLine);
			processor.digest(validLine);
			processor.digest(lineComment);
			processor.digest(validLine);
			expect(processor.state).to.eql({
				count: 4,
			});
		});

		it('digests a valid line followed by a line comment', () => {
			processor.digest(`${validLine}${lineComment}`);
			expect(processor.state).to.eql({
				count: 1,
			});
		});

		it('digests zero lines with two consecutive line comments', () => {
			processor.digest(`${lineComment}${lineComment}`);
			expect(processor.state).to.eql({
				count: 0,
			});
		});
	});

	describe('Block comments', () => {
		it('digests a single block comment', () => {
			processor.digest(blockComment.oneLine);
			expect(processor.state).to.eql({
				count: 0,
			});
		});

	});

});
