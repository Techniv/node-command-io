
var sandbox = require('nodeunit').utils.sandbox;
var path = require('path');
var context = {
	process: Object.create(process),
	module: {
		exports: {}
	},
	require: require,
	console: console,
	__dirname: path.resolve(path.join(__dirname,'..','libs'))
};
context.global = context;

context.process.stdout = Object.create(process.stdout);
context.process.stdout.getWindowSize = function(){
	return [80,60];
}

module.exports = sandbox(__dirname+'/../libs/commandio.js', context);
