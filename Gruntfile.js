module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: 'src/*.js',
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
	    },
	    connect: {
	    	server: {
	      		options: {
	        		port: 8888,
	        		keepalive: true,
	        		base: 'examples'
	      		}
	    	}
	  	},
	  	copy: {
			main: {
		    	src: 'build/*',
		    	dest: 'examples/GameEngine.min.js',
		  	}
		},
  	});

  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-connect');
  	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['build']);

  	grunt.registerTask('build', ['uglify','copy']);
  	grunt.registerTask('serve', ['connect']);

};