module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
          options: {
            beautify: true  
          },
	        src: [	
              'src/engine/objects/*.js',
	        		'src/engine/core/*.js',
	        		'src/engine/utils/*.js',
	        		'src/engine/vendor/*.js'
	        ],
	        dest: 'build/<%= pkg.name %>.js'
	      },
        buildMin: {
          options: {
            beautify: false  
          },
          src: [  
              'src/engine/objects/*.js',
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
		    	src: 'build/GameEngine.min.js',
		    	dest: 'examples/GameEngine.min.js',
		  	},
		},
  		watch: {
  			options: {
      			livereload: true,
    		},
  			engine: {
    			files: ['src/**/*'],
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