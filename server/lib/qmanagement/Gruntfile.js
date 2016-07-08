module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: ['css/bootstrap.min.css', 'css/ng-grid.min.css', 'css/quill.snow.css', 'css/toastr.css', 'css/home.css'],
        dest: 'dist/<%= pkg.name %>.css'
      },
      js : {
        src: ['lib/angular.min.js', 'lib/ui-bootstrap-tpls-0.11.0.min.js', 'lib/jquery.min.js', 'lib/bootstrap-3.1.1/js/bootstrap.min.js', 'lib/quill.min.js', 'lib/ng-grid/ng-grid-2.0.11.min.js', 'lib/toastr.min.js', 'lib/angular-local-storage.js', 'lib/spin.min.js', 'lib/ng-grid-flexible-height.js', 'js/home.js', 'js/serviceRequests.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    // qunit: {
    //   files: ['*.html']
    // },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          angular: true,
          document: true
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'views/index.html'     // 'destination': 'source'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'cssmin', 'htmlmin']);

};