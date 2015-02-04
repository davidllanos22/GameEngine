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
              'src/objects/*.js',
	        		'src/core/*.js',
	        		'src/utils/*.js',
	        		'src/vendor/*.js'
	        ],
	        dest: 'build/<%= pkg.name %>.js'
	      },
        buildMin: {
          options: {
            beautify: false  
          },
          src: [  
              'src/objects/*.js',
              'src/core/*.js',
              'src/utils/*.js',
              'src/vendor/*.js'
          ],
          dest: 'build/<%= pkg.name %>.min.js'
        }
	    },
	    connect: {
	    	server: {
	      		options: {
	      			livereload: false,
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
      			livereload: false,
    		},
  			engine: {
    			files: ['src/**/*'],
    			tasks: ['build']
        },
        examples: {
    			files: ['examples/**/*'],
    			tasks: []
        }
  			
  		},
      jsdoc : {
        dist : {
            src: ['src/**/*.js'], 
            options: {
                destination: 'docs'
            }
        }
      }
  	});

  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-connect');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['build']);

  	grunt.registerTask('build', ['uglify','copy']);
  	grunt.registerTask('serve', ['connect','watch']);

};