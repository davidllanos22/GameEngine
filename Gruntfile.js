module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: [	'src/engine/objects/*.js',
	        		'src/engine/core/*.js',
	        		'src/engine/utils/*.js',
	        		'src/engine/vendor/*.js'
	        	],
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
	    },
	    connect: {
	    	server: {
	      		options: {
	      			livereload: true,
	        		port: 8888,
	        		base: 'examples'
	      		}
	    	}
	  	},
	  	copy: {
			main: {
		    	src: 'build/*',
		    	dest: 'examples/GameEngine.min.js',
		  	},
		  	editor: {
		    	src: 'src/editor/**/*',
		    	dest: 'examples/basics/07/'
		  	}
		},
  		watch: {
  			options: {
      			livereload: true,
    		},
  			engine: {
    			files: ['src/engine/**/*'],
    			tasks: ['build']
            },
            editor: {
    			files: ['src/editor/**/*'],
    			tasks: ['build']
            },
            examples: {
    			files: ['examples/**/*'],
    			tasks: []
            }
  			
  		}
  	});

  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-connect');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['build']);

  	grunt.registerTask('build', ['uglify','copy']);
  	grunt.registerTask('serve', ['connect','watch']);

};