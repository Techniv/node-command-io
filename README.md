Command.IO
==========

![build-status](http://status.ci.techniv.fr/Command.IO)

This program is a library that provides management of the console user input during the execution of the application.
With Command.IO, you can simply intercept the console input commands and bind action on this. For each command you
can associate description that is used by Command.IO to generate an inline help.

Command.IO is publish under [MIT license](https://raw.github.com/Techniv/node-command-io/master/LICENSE).

[![NPM](https://npmjs.org/favicon.ico)](https://npmjs.org/package/command.io)

## API

Module name : ```command.io```

Command.IO provide by defaut two commands on the application run :

- **help**: displays the description of registered commands.
- **exit**: executes the 'before exit' actions and exit the application with exit code 0.

For developpers, Command.IO provides the folowing methods :

- **addCommand**: Registers a command and its action.
- **addCommands**: Registers a list of command.
- **beforeExit**: Resters a 'before exit' action (execute on exit command).

### Exemple:

#### Loading module:
The module is initialized on load by require.
```javascript
var commandio = require('command.io');
```

#### Add commands.
The `addCommand` methode take three parameters : the name of command, the description for help
generation and the action callback. This command return the Command.IO API and its call can be chained.
```javascript
var commandio = require('command.io');

commandio.addCommand(
	'command1',
	'The first command',
	function(){
		console.log('Action of first command');
	});

// Exemple of chained call.
commandio.addCommand(
	'command2',
	'The second command',
	function(){
		console.log('Action of second command');
	})
.addCommand(
	'command3',
	'The third command',
	function(){
		console.log('Action of third command');
	});
```

The `addCommands` take an array of objects what describe each commands.
```javascript
var commandio = require('command.io');

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
```

#### Before Exit
The `beforeExit` take only a callback in parameter. The action what store in a collection and execute on exit command call, juste before the application closing.
```javascript
var commandio = require('command.io');

commandio.beforeExit(function(){
	console.log('I just have time to say goodbye.');
});
```