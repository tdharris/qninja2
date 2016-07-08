module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: ['../client/qmanagement/css/bootstrap.min.css', '../client/qmanagement/css/ng-grid.min.css', '../client/qmanagement/css/quill.snow.css', '../client/qmanagement/css/toastr.css', '../client/qmanagement/css/home.css'],
        dest: '../client/qmanagement/dist/<%= pkg.name %>.css'
      },
      js : {
        src: ['../client/qmanagement/lib/angular.min.js', '../client/qmanagement/lib/ui-bootstrap-tpls-0.11.0.min.js', '../client/qmanagement/lib/jquery.min.js', '../client/qmanagement/lib/bootstrap-3.1.1/js/bootstrap.min.js', '../client/qmanagement/lib/quill.min.js', '../client/qmanagement/lib/ng-grid/ng-grid-2.0.11.min.js', '../client/qmanagement/lib/toastr.min.js', '../client/qmanagement/lib/angular-local-storage.js', '../client/qmanagement/lib/spin.min.js', '../client/qmanagement/lib/ng-grid-flexible-height.js', '../client/qmanagement/js/home.js', '../client/qmanagement/js/serviceRequests.js'],
        dest: '../client/qmanagement/dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '../client/qmanagement/dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    // qunit: {
    //   files: ['../client/qmanagement/*.html']
    // },
    jshint: {
      files: ['Gruntfile.js', '../client/qmanagement/js/*.js'],
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
          '../client/qmanagement/dist/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
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
          '../client/qmanagement/index.html': '../client/qmanagement/views/index.html'     // 'destination': 'source'
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