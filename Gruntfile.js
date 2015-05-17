module.exports = function(grunt) {
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          // dest - src
          "build/files/core/Font.js" : "src/core/Font.js",
          "build/files/core/Game.js" : "src/core/Game.js",
          "build/files/core/Graphics.js" : "src/core/Graphics.js",
          "build/files/core/Input.js" : "src/core/Input.js",
          "build/files/core/Loader.js" : "src/core/Loader.js",
          "build/files/core/Scene.js" : "src/core/Scene.js",
          "build/files/objects/Camera.js" : "src/objects/Camera.js",
          "build/files/objects/Entity.js" : "src/objects/Entity.js",
          "build/files/objects/Rectangle.js" : "src/objects/Rectangle.js",
          "build/files/utils/Animation.js" : "src/utils/Animation.js",
          "build/files/utils/Math.js" : "src/utils/Math.js",
          "build/files/utils/StateMachine.js" : "src/utils/StateMachine.js",
          "build/files/utils/Timer.js" : "src/utils/Timer.js",
          "build/files/utils/TimerManager.js" : "src/utils/TimerManager.js",
          "build/files/utils/Utils.js" : "src/utils/Utils.js"
        }
      }
    },
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

  grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['build']);

	grunt.registerTask('build', ['babel', 'uglify','copy']);
	grunt.registerTask('serve', ['connect','watch']);

};