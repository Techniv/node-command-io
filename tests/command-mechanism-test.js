/**
 * Test the internal command mechanism.
 */

var commandio = require('./commandio-sandbox.js');

module.exports = {
	commandController: function(test){
		test.expect(5);
		var descriptor = {
			name: 'cmd',
			description: 'cdm desc',
			action: function(){
				test.equal(this.name, 'cmd', 'Name');
				test.equal(this.description, 'cdm desc', 'Description');

				var error = new this.RuntimeCommandError('msg');
				var baseError = new commandio.RuntimeCommandError('msg', 'cmd');

				test.equal(error.name, baseError.name);
				test.equal(error.message, baseError.message);
				test.equal(error.level, baseError.level);
			}
		}

		commandio.addCommand(descriptor);
		commandio.processCommand(['cmd']);
		test.done();
	}
};