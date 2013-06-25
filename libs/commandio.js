/**
 * Created with JetBrains WebStorm.
 * User: vincent.peybernes
 * Date: 25/06/13
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

// Get the stream input node console
var stdin = process.stdin;

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

var parseCommand = function(key){

    // Remove the carryage return character
    key = key.replace(/\r?\n$/, "");

    // Split the command line to get the command key and the arguments
    var split = key.split(" ");

    return split;
}

var processCommand = function(params){

    // Get the command key
    var command = params.shift();

    // Create an emitter and broadcast the command
    emitter.emit(command, params);
}

var addCommand = function(name, action){

    // Listen the command
    emitter.on(name, function(params){

        // Call the callback with the global context and the arguments array
        action.apply(global, params);
    });
}

module.exports = {
    addCommand: addCommand
};


