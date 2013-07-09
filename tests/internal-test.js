
var commandio = require('./commandio-sandbox.js'),
	command = 'test',
	description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et tempor tellus. Quisque dolor dui, '
				+'ullamcorper sit amet purus ut, tincidunt accumsan dolor. Etiam volutpat ipsum sit amet purus congue '
				+'mollis. Sed ut scelerisque dolor, eu condimentum nullam.',
	formatEndLine = 2;

module.exports = {
	formatHelpLine: function(test){

		var result = commandio.formatHelpLine(command,description);
		var endLine = result.match(/\n/g);

		test.equal(endLine.length,formatEndLine);
		test.done();
	},

	errors: function(test){

		var commandError = new commandio.CommandError('test');
		var runtimeCommandError = new commandio.RuntimeCommandError('test');

		test.equal(commandError.name, 'CommandError', 'Error name');
		test.equal(runtimeCommandError.name, 'RuntimeCommandError', 'Error name');

		test.equal(typeof commandError.stack, 'string', 'Error stack');
		test.equal(typeof runtimeCommandError.stack, 'string', 'Error stack');

		test.ok(runtimeCommandError instanceof commandio.CommandError, 'Error inheritance');

		test.done();
	}
}
