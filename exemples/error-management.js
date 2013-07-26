// Load module : require('command.io')
var commandio = require('..');

commandio.addCommand({
	name: 'notice',
	description: 'This command only log a notice',
	action: function(){
		// Throw error with notice level.
		throw new this.CommandError('This is a notice.', this.errorLvl.notice);
	}
});

commandio.addCommand({
	name: 'error',
	description: 'This command only log an error',
	action: function(){
		// Throw error with default error level.
		throw new this.CommandError('This is an error.');
	}
});

commandio.addCommand({
	name: 'critical',
	description: 'This command throw a critical error and stop program.',
	action: function(){
		// Throw error with critical error level.
		throw new this.CommandError('This is an error.', this.errorLvl.critical);
	}
});

commandio.addCommand({
	name: 'throw-error',
	description: 'This command throw an error and stop program',
	exceptionCatchLvl: commandio.errorLvl.error,
	action: function(){
		// Throw error with default error level.
		throw new this.CommandError('This is an error.');
	}
});

commandio.addCommand({
	name: 'runtime',
	description: 'This throw a runtime error and stop program',
	action: function(){
		// Throw runtime error.
		throw new this.RuntimeCommandError('This is a runtime error.');
	}
});