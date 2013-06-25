var commandio = require('..');

commandio.addCommand('test', function(){
	console.log(arguments);
});