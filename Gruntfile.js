
module.exports = function(grunt){

	grunt.initConfig({
		nodeunit: {
			all: ["tests/**/*-test.js"]
		}
	});

	grunt.registerTask('default', ['nodeunit']);

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
}
