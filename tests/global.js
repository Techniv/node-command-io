var commandio = require('..');

commandio.addCommand('test', "The test function", function(){
	console.log(arguments);
});

commandio.addCommand('lol', "The lol function", function(){
    console.log(arguments);
});

commandio.beforeExit(function(){
	console.log("I've just the time to say you good bye");
})