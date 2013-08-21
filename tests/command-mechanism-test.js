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
	 * By default exceptionCatchLvl = 1.
	 * @param test
	 */
	throwingException: function(test){
		test.expect(7);
		var descriptor;


		descriptor = {
			name: 'error',
			description: 'cdm desc',
			action: function(){
				throw new this.CommandError('Error');
			}
		};

		commandio.addCommand(descriptor);
		test.doesNotThrow(function(){
			commandio.processCommand(['error']);
		});


		descriptor = {
			name: 'error2',
			description: 'cdm desc',
			exceptionCatchLvl: 1,
			action: function(){
				throw new this.CommandError('Error');
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['error2']);
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
			action: function(){
				throw new this.CommandError('Error', 3);
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['error3']);
		});


		descriptor = {
			name: 'runtime',
			description: 'cdm desc',
			action: function(){
				throw new this.RuntimeCommandError('Runtime Error');
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['runtime']);
		});


		// Native error test.

		descriptor = {
			name: 'native',
			description: 'cdm desc',
			action: function(){
				throw new Error('Native Error');
			}
		};

		commandio.addCommand(descriptor);
		test.throws(function(){
			commandio.processCommand(['native']);
		});


		descriptor = {
			name: 'nativeCatch',
			description: 'cdm desc',
			catchNativeError: true,
			action: function(){
				throw new Error('Native Error');
			}
		};

		commandio.addCommand(descriptor);
		test.doesNotThrow(function(){
			commandio.processCommand(['nativeCatch']);
		});

		test.done();
	}
};