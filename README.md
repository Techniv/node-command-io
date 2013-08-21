Command.IO
==========

![build-status](http://status.ci.techniv.fr/Command.IO)

This program is a library that provides management of the console user input during the execution of the application.
With Command.IO, you can simply intercept the console input commands and bind action on this. For each command you
can associate description that is used by Command.IO to generate an inline help.

Command.IO is publish under [MIT license](https://raw.github.com/Techniv/node-command-io/master/LICENSE).

[![NPM](https://npmjs.org/favicon.ico)](https://npmjs.org/package/command.io)
```
npm install command.io
```

## API

Module name : ```command.io```

Command.IO provide by defaut two commands on the application run :

- **help**: displays the description of registered commands.
- **exit**: executes the 'before exit' actions and exit the application with exit code 0.

For developers, Command.IO provides the folowing methods :

* **addCommand**: Registers a command and its action.
* **addCommands**: Registers a list of command.
* **beforeExit**: Registers a 'before exit' action (execute on exit command).

### Command descriptor

The **addCommand** and **addCommands** methods use the **command descriptor**. This is an object what describe the
command. It take this following parameters :
* **name** (mandatory): this is the name of command used to recognize it when the user call it. Space are not allow.
* **description** (mandatory): this is a description of your command what used to generate the inline help.
* **action** (mandatory): this is a callback (function) what execute when the command is call.
* **exceptionCatchLvl**: this is the minimum severity of error catches by Command.IO to not terminate the programme.
Currently, only CommandErrors are caught.
* **catchNativeError**: *false* by default. If *true* all the unrecognized error (like the native Error object) was
catch and log but not termite the programme.

### Actions

The action of a command is a function what call when the user type the command. It takes in parameter the list of words
that follow the command (one argument by word).
The function take an object in context (*this*) what provide utilities to manage the command execution :
* **name**: the name of the command.
* **description**: the description of command.
* **CommandError**: constructor of CommandError, configured for the command.
  [View error management](https://github.com/Techniv/node-command-io/wiki/Error-management-in-command's-action)
* **RuntimeCommandError**: constructor of RuntimeCommandError, configured for the command.
  [View error management](https://github.com/Techniv/node-command-io/wiki/Error-management-in-command's-action)
* **errorLvl**: a collection of constant with value of severity error level (`notice`,`error`,`critical`).

## Exemple:

#### Loading module:
The module is initialized on load by require.
```javascript
var commandio = require('command.io');
```

#### Add commands.
**Warning**
There are a refactoring process on this command. [Check this acticle](https://github.com/Techniv/node-command-io/wiki/Command-descriptor-refactoring).

The `addCommand` methode take three parameters : the name of command, the description for help
generation and the action callback. This command return the Command.IO API and its call can be chained.
```javascript
var commandio = require('command.io');

commandio.addCommand({
	name: 'command1',
	description: 'The first command',
	action: function(){
		console.log('Action of first command');
	}
});

// Exemple of chained call.
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

## Changelog
**0.2.0-a:**
* Unification of *command descriptor*.
* Add custom execution context for command action.
* Add custom error.
* Add internal logger system using `color`.


## Planned features

* Action's feedback and exception processing.
* Command's parameters validation.
* Define and manage strategy on multiple definition for an existing command.
* Configurable, interception of exit event and POSIX exit signal for *before exit* actions.
