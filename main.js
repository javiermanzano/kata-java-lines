const { join } = require('path');
const { state, digest } = require('./processor')();
const javaSample = require('fs').readFileSync(join(__dirname, 'sample.java'), 'utf-8');

const lines = javaSample.split('\n');
lines.forEach(line => {
	digest(line);
	console.log(state);
});
console.log(state);
