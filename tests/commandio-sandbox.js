
var sandbox = require('nodeunit').utils.sandbox;
var path = require('path');
var context = {
	process: process,
	module: {
		exports: {}
	},
	require: require,
	console: console,
	__dirname: path.resolve(path.join(__dirname,'..','libs'))
};
context.global = context;

module.exports = sandbox(__dirname+'/../libs/commandio.js', context);
