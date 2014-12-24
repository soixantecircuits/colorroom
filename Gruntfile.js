module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '*',
          base: ['public', 'bower_components'],
          // keepalive: true,
          livereload: true
        }
      }
    },
    watch: {
      configFiles: {
        files: ['public/**', '!public/js/config.**', '!public/js/colors.**'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('production', ['connect']);

};