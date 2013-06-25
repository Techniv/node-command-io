/**
 * Created with JetBrains WebStorm.
 * User: vincent.peybernes
 * Date: 25/06/13
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */

// Get the stream input node console
var stdin = process.stdin;

// Flush the stream input buffer
stdin.resume();

// Set encoding for the input stream to UTF8
stdin.setEncoding('UTF-8');

// Listen the new command pass through console on the enter pressed key
stdin.on('data', function(key){

    // Parse the command line
    parseCommand(key);
});

var parseCommand = function(key){

    // Remove the carryage return character
    key.replace("\n", "");

    // Split the command line to get the command key and the arguments
    var split = key.split(" ");

    // Get the command key and remove it from the split array. So the split array are the arguments
    var command = split.shift();
}


