/*jshint ignore:start*/

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-ember-templates');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['server.js', 'js/**/*.js'],
			options: {
				ignores : ['js/templates.js'],
				newcap: false
			}
		},
		emberTemplates: {
			default: {
				options: {
					templateBasePath: 'templates/',
				},
				files: {
					'js/templates.js': 'templates/**/*.hbs'
				},
			},
		},
		watch: {
			options: {
				livereload: true,
			},
			less: {
				files: [
					'less/*.less',
				],
				tasks: [
					'less',
				],
			},
			hbs: {
				files: ['templates/**/*.hbs'],
				tasks: ['emberTemplates'],
			},
		},
		less: {
			development: {
				files: {
					'css/styles.css': 'less/styles.less'
				}
			},
		},
		copy: {
			development: {
				files: [
					{
						expand: true,
						src: ['lib/bootstrap/dist/fonts/*'],
						dest: 'fonts/',
						filter: 'isFile',
						flatten: true,
					},
				]
			}
		},
		bower: {
			install: {
				options: {
				},
			}
		},
	});

	grunt.registerTask('default', ['jshint', 'bower:install', 'copy:development', 'emberTemplates', 'less', 'watch']);
	grunt.registerTask('build', ['bower:install', 'copy:development', 'emberTemplates', 'less']);

};
/*jshint ignore:end*/
