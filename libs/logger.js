require('colors');


var p = "[command.io]"
var f = {
	i: 'INFO ',
	w: 'WARN ',
	e: 'ERROR'
}
var stdout = process.stdout;
var stderr = process.stderr;

var logger = {
	log: function(){
		console.log.apply(module, arguments);
	},
	info: function(message){
		var str = p.green+' - '+f.w.green+' - '+message;
		stdout.write(str+'\n');
	},
	warn: function(message){
		var str = p.yellow+' - '+f.w.yellow+' - '+message;
		stdout.write(str+'\n');
	},
	error: function(message, err){
		var str = p.red+' - '+f.e.red+' - '+message;
		stderr.write(str+'\n');
		if(err && typeof err.stack == 'string')
			stderr.write(err.stack+'\n');
	}
}

module.exports = logger;
