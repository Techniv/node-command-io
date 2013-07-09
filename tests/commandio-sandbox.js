var path = require('path');
var libsPath = path.resolve(path.join(__dirname,'..','libs'));


var sandbox = require('nodeunit').utils.sandbox;
var context = {
	process: process,
	module: {
		exports: {}
	},
	require: require,
	console: console,
	__dirname: libsPath
};
context.global = context;

module.exports = sandbox(path.join(libsPath,'commandio.js'), context);
