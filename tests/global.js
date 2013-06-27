var commandio = require('..');

commandio.addCommand('test', "The test function", function(){
	console.log(arguments);
})
		.addCommand('lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et tempor tellus. Quisque dolor dui, '
		+'ullamcorper sit amet purus ut, tincidunt accumsan dolor. Etiam volutpat ipsum sit amet purus congue '
		+'mollis. Sed ut scelerisque dolor, eu condimentum nullam.', function(){})

		.addCommand('lol', "The lol function", function(){
    console.log(arguments);
});

commandio.beforeExit(function(){
	console.log("I've just the time to say you good bye");
})