/*
 * Command.IO
 * <https://github.com/Techniv/node-command-io>
 *
 * This program is a library that provides management of the console user input during the execution of the application.
 * With Command.IO, you can simply intercept the console input commands and bind action on this. For each command you
 * can associate description that is used by Command.IO to generate an inline help.
 *
 * Command.IO is publish under MIT license.
 * Copyright (c) 2013 Vincent Peybernes, Thomas Pons.
 * <https://raw.github.com/Techniv/node-command-io/master/LICENSE>
 */

var logger = require(__dirname+'/logger');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var stdin = process.stdin,
	commandDescriptor = {},
	exitActions = [],
	indentLength = 15,
	CONST = {
		descriptorType: {
			name: 'string',
			description: 'string',
			action: 'function'
		},
		descriptorOptType: {

		},
		errorLvl: {
			notice:		1,
			error:		2,
			critical:	3
		}
	}


// Listen the help command
emitter.on('help', function(params){
    help.apply(this, params);
});

// Listen the exit command
emitter.on('exit', function(){

	// Execute the custom exit action, before closing application.
	for(var i in exitActions){
		exitActions[i].apply(global);
	}

    process.exit(0);
});

// Flush the stream input buffer
stdin.resume();

// Set encoding for the input stream to UTF8
stdin.setEncoding('UTF-8');

// Listen the new command pass through console on the enter pressed key
stdin.on('data', function(key){

    // Parse the command line
    var params = parseCommand(key);

    // Process the command
    processCommand(params);
});

function parseCommand(key){

    // Remove the carryage return character
    key = key.replace(/\r?\n$/, "");

    // Split the command line to get the command key and the arguments
    var split = key.split(" ");

    return split;
}

function processCommand(params){

    // Get the command key
    var command = params.shift();

    // Create an emitter and broadcast the command
    emitter.emit(command, params);
}

/**
 * Add a command
 * @param name string
 * @param description string
 * @param action Function
 * @returns Object return Command.IO API.
 */
function addCommand(descriptor){
	// Check descriptor type.
	var err = {};
	if( !checkDescriptor(descriptor, err) ){
		logger.error(
			'The command descriptor is invalid.',
			new Error('[command.io] Invalid command descriptor ("'+err.key+'": expected "'+err.expect+'", have "'+err.type+'").')
		);
		logger.error('Please check this doc: https://github.com/Techniv/node-command-io/wiki/Command-descriptor-refactoring');
		return module.exports;
	}

	var name = descriptor.name;

    // Associate the command name with his description
    commandDescriptor[name] = descriptor.description;

    // Listen the command
    emitter.on(name, function(params){

        // Call the callback with the global context and the arguments array
        descriptor.action.apply(global, params);
    });

    // Chain addCommand
    return module.exports;
}

/**
 * Add commands recursively.
 * @param commands Object[] An array of command descriptor {name: string, description: string, :action: function}.
 * @return Object Return Command.IO API.
 */
function addCommands(commands){
	for(var i in commands){
		var commandObj = commands[i];
		addCommand(commandObj);
	}

	return module.exports;
}

/**
 * Add an action to be executed just before the end of application run, when the user call the exit command
 * (auto generated by Command.IO)
 * @param action Function
 * @returns Object Return Command.IO API.
 */
function beforeExit(action){
	if( typeof action != 'function') throw new Error('[command.io] The action must be a function.');

	exitActions.push(action);

	return module.exports;
}

function help(name){

	// Add blank line separation.
	console.log('--');

    // If the command is present
    if(typeof name != 'undefined'){

        // Get the description
        var description = commandDescriptor[name];

        // If the description exists print it
        if(typeof description != 'undefined'){
            console.log(formatHelpLine(name,description));
        }else{
            console.log("This command doesn't exists or doesn't have description. Enter help to see all the availables commands.")
        }
    //If the command is not present print all the commands with descriptions
    }else{
        for(var key in commandDescriptor){
            console.log(formatHelpLine(key,commandDescriptor[key])+'\n');
        }
    }

	// Add blank line separation.
	console.log('--\n');
}

module.exports = {
    addCommand: addCommand,
	addCommands: addCommands,
	beforeExit: beforeExit
};


// UTILS

function getConsoleWidth(){
	try{
		var stdSize = process.stdout.getWindowSize();
	} catch (e){
		var stdSize = [80];
	}
	return stdSize[0];
}

function formatHelpLine(command, description){
	var rows = [], consoleWidth = getConsoleWidth(), currantRow;

	currantRow = command;
	currantRow += (new Array(indentLength - command.length)).join(' ');
	currantRow += description;
	if(currantRow.length > consoleWidth){
		while(currantRow.length > consoleWidth){

			// Scan the end portion to find the last entire word before wrap.

			for(var i = consoleWidth-1; i>=0; i--){
				if(/\s/.test(currantRow[i])){
					rows.push(currantRow.slice(0,i));
					currantRow = currantRow.slice(i+1);
					currantRow = currantRow.replace(/^\s/, '');
					currantRow = (new Array(indentLength)).join(' ')+currantRow;
					break;
				}
			}
		}

		return rows.join('\n');
	} else {
		return currantRow;
	}
}

/**
 * Check if the command descriptor is valid.
 * @return boolean
 */
function checkDescriptor(descriptor, err){
	if(typeof descriptor != 'object') return false;
	
	for(var key in CONST.descriptorType){
		if(typeof descriptor[key] != CONST.descriptorType[key]){
			err.key = key;
			err.expect = CONST.descriptorType[key];
			err.type = typeof descriptor[key];
			return false;
		}
	}

	for(var key in CONST.descriptorOptType){
		if(typeof descriptor[key] != 'undefined' && typeof descriptor[key] != CONST.descriptorType[key]){
			err.key = key;
			err.expect = CONST.descriptorType[key];
			err.type = typeof descriptor[key];
			return false;
		}
	}

	return true;
}

// ERRORS
/**
 * Custom error object to manage exceptions on command's action.
 * @param string message The error message.
 * @param string command The command name what throw the error.
 * @param int level The severity level (1,2 or 3 to notice, error, critical).
 * @constructor
 */
function CommandError(message, command, level){
	var that = this, error;

	// Set the default level.
	if( isNaN(level) || level < 1 || level > 3) level = CONST.errorLvl.error;

	// Format the message
	if(typeof command == 'string') message = '{'+command+'} '+message;
	message = '[command.io] '+message;

	// Create the native Error object.
	error = new Error(message);

	// Create the getter for native error properties and custom properties.
	Object.defineProperties(this, {
		'stack': {
			get: function(){
				return error.stack;
			}
		},
		message: {
			get: function(){
				return error.message;
			}
		},
		name: {
			get: function(){
				return that.constructor.name;
			}
		},
		command: {
			get: function(){
				return command;
			}
		},
		level: {
			get: function(){
				return level;
			}
		}
	});
}
CommandError.prototype.__proto__ = Error.prototype;

/**
 * Custom error object to manage exceptions on command's action. This is error was throw to runtime level.
 * All runtime error have a critical severity level.<br/>
 * This error extend {@link CommandError}
 * @param string message The error message.
 * @param string command The command name what throw the error.
 * @constructor
 */
function RuntimeCommandError(message, command){
	CommandError.call(this, message, command, CONST.errorLvl.critical);
}
RuntimeCommandError.prototype.__proto__ = CommandError.prototype;
