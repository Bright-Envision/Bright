/*
*	Core grunt build file...
*	This will Concatenate all the files and minify them
*/



module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
    	build: ['dist/*.js']
    },
    concat: {
	  options: {
	    // define a string to put between each file in the concatenated output
	    separator: ';'
	  },
	  dest: {
	    // the files to concatenate
	    src: ['src/core/index.js', 'src/ajax/index.js', 'src/events/index.js', 'src/data/index.js', 'src/css/index.js', 'src/prototype/index.js', 'src/selector/index.js'],
	    dest: 'dist/<%= pkg.name %>.js'
	  }
	},
	uglify: {
      options: {
        banner: "/*! Bright v<%= pkg.version %> | " +
						"(c) 2014, <%= grunt.template.today('yyyy') %> Bright Foundation, Inc. | " +
						"Bright.org/license */\n",
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dest.dest %>']
        }
      }
    },
  });


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');



	grunt.registerTask('default', ['clean', 'concat', 'uglify']);


};





