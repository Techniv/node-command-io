var commandio = require('..');

commandio.addCommand({
	name:'test',
	description:"The test function",
	action:function(){
		console.log(arguments);
	}
})
.addCommand({
	name: 'lorem',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et tempor tellus. Quisque dolor dui, '
		+'ullamcorper sit amet purus ut, tincidunt accumsan dolor. Etiam volutpat ipsum sit amet purus congue '
		+'mollis. Sed ut scelerisque dolor, eu condimentum nullam.',
	action: function(){}
})
.addCommand({
	name: 'lol',
	description: "The lol function",
	action: function(){
		console.log(arguments);
	}
});

commandio.beforeExit(function(){
	console.log("I've just time to say goodbye");
});

commandio.addCommands([
	{
		name: 'cmd1',
		description: 'Throw notice',
		action: function(arg){
			console.log(arg);
			throw new this.CommandError('Error cmd1', 1);
		}
	},
	{
		name: 'cmd2',
		description: 'Throw critical error',
		action: function(arg){
			console.log(arg*2);
			throw new this.CommandError('Error cmd2', 3);
		}
	},
	{
		name: 'cmd3',
		description: 'Throw runtime error',
		action: function(arg){
			console.log(arg*2);
			throw new this.RuntimeCommandError('Error cmd3');
		}
	}
]);
