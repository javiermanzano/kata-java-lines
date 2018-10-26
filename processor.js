module.exports = () => {
	const states = {
		regular: 'REGULAR',
		block: 'BLOCK',
	};

	let state = { count: 0, currentState: states.regular };

	const lineComment = line => line.indexOf('//') === 0;
	const openBlockComment = line => line.indexOf('/*') === 0 && line.indexOf('*/') !== line.length - 2;
	const closeBlockComment = line => line.indexOf('/*') !== 0 && line.indexOf('*/') === line.length - 2;
	const validLine = line => line.indexOf('/*') === -1 && (line.indexOf('*/') === -1 && !lineComment(line));

	const transition = input => {
		if (state.currentState === states.regular) {
			if (openBlockComment(input)) {
				state.currentState = states.block;
			}
		}

		if (state.currentState === states.block) {
			if (input.length > 1 && closeBlockComment(input)) {
				state.currentState = states.regular;
			}
		}
	};

	const digest = line => {
		transition(line);

		if (state.currentState === states.regular && validLine(line)) {
			state.count++;
		}
	};

	return { state, digest, states };
};
