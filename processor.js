module.exports = () => {
	let state = { count: 0 };

	const digest = line => {
		if (line.indexOf('//') !== 0) {
			state.count++;
		}
	};

	return { state, digest };
};
