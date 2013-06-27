
var sandbox = require('nodeunit').utils.sandbox;
var context = {
	process: process,
	module: {
		exports: {}
	},
	require: require,
	console: console
};
context.global = context;

module.exports = sandbox(__dirname+'/../libs/commandio.js', context);

module.exports.getConsoleWidth = function(){
	return 80;
}