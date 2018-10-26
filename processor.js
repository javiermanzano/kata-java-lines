module.exports = () => {
	let state = { count: 0 };

	const digest = () => {
		state.count++;
	};

	return { state, digest };
};
