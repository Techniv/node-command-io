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
	},


	/**
	 * Test exception management.
	 * Runtime never catch.
	 * Errors are catch if their error lvl are >= exceptionCatchLvl parameter.
	 * By default exceptionCatchLvl = 2 (3 for runtime).
	 * @param test
	 */
	throwingException: function(test){
		test.expect(4);
		var descriptor;


		descriptor = {
			name: 'error',
			description: 'cdm desc',
			action: function(){
				throw new this.CommandError('Error');
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['error']);
		});


		descriptor = {
			name: 'error1',
			description: 'cdm desc',
			action: function(){
				throw new this.CommandError('Notice', 1);
			}
		};

		commandio.addCommand(descriptor);
		test.doesNotThrow(function(){
			commandio.processCommand(['error1']);
		});


		descriptor = {
			name: 'error3',
			description: 'cdm desc',
			exceptionCatchLvl: 3,
			action: function(){
				throw new this.CommandError('Error');
			}
		};

		commandio.addCommand(descriptor);
		test.doesNotThrow(function(){
			commandio.processCommand(['error3']);
		});


		descriptor = {
			name: 'runtime',
			description: 'cdm desc',
			exceptionCatchLvl: 0,
			action: function(){
				throw new this.RuntimeCommandError('Runtime Error');
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['runtime']);
		});


		test.done();
	}
};