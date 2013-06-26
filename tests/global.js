var commandio = require('..');

commandio.addCommand('test', "The test function", function(){
	console.log(arguments);
});

commandio.addCommand('lol', "The lol function", function(){
    console.log(arguments);
});