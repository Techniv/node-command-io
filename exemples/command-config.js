
// Load module : require('command.io')
var commandio = require('..');

// Register a single command.
// Take 3 parameters : the name of command, the description, the action callback.
commandio.addCommand({
	name: 'command1',
	description: 'The first command',
	action: function(){
		console.log('Action of first command');
	}
});

// You can chain the addCommand call.
commandio.addCommand({
	name: 'command2',
	description: 'The second command',
	action: function(){
		console.log('Action of second command');
	}
}).addCommand({
	name: 'command3',
	description: 'The third command',
	action: function(){
		console.log('Action of third command');
	}
});

// The 'addCommands' method permit to register multiple command.
// Take an array of object in parameter.
commandio.addCommands([
	{
		name: 'command4',
		description: 'The fourth command',
		action: function(){
			console.log('Action of fourth command');
		}
	},
	{
		name: 'command5',
		description: 'The fifth command',
		action: function(){
			console.log('Action of fifth command');
		}
	}
]);

// A special method 'beforeExit' can register action what execute on exit special command, just before the end of execution.
// The 'exit' command provided by Command.IO stop the application with exit code 0.
// Take only an action callback in parameter.
commandio.beforeExit(function(){
	console.log('I just have time to say goodbye.');
});