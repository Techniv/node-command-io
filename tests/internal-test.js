
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
	}
}
