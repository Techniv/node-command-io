
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var stdin = process.stdin;
var commandDescriptor = {};
var exitActions = [];

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
};

function processCommand(params){

    // Get the command key
    var command = params.shift();

    // Create an emitter and broadcast the command
    emitter.emit(command, params);
};

function addCommand(name, description, action){

    // Associate the command name with his description
    commandDescriptor[name] = description;

    // Listen the command
    emitter.on(name, function(params){

        // Call the callback with the global context and the arguments array
        action.apply(global, params);
    });

    // Chain addCommand
    return module.exports;
};

function beforeExit(action){
	if( typeof action != 'function') throw new Error('[command.io] The action must be a function.');

	exitActions.push(action);
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
            console.log(name + " : " + description);
        }else{
            console.log("This command doesn't exists or doesn't have description. Enter help to see all the availables commands.")
        }
    //If the command is not present print all the commands with descriptions
    }else{
        for(var key in commandDescriptor){
            console.log(key + " : " + commandDescriptor[key]);
        }
    }

	// Add blank line separation.
	console.log('--');
}

module.exports = {
    addCommand: addCommand,
	beforeExit: beforeExit
};


