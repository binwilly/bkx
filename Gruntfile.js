module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';',
        },
        src: [
          'src/js/bubbletree.js',
          'src/js/layout.js',
          'src/js/line.js',
          'src/js/loader.js',
          'src/js/mouseeventgroup.js',
          'src/js/ring.js',
          'src/js/transitioner.js',
          'src/js/utils.js',
          'src/js/vector.js',
          'src/js/bubbles/plain.js',
          'src/js/bubbles/donut.js',
          'src/js/bubbles/icon.js'
        ],
        dest: 'build/bubbletree.js',
      },
      css: {
        src: [
          'src/css/bubbletree.css',
          'src/css/page.css',
          'src/css/tooltip.css',
          'src/css/bkx.css',
        ],
        dest: 'build/bubbletree.css',
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js','src/js/bubbles/*.js','src/css/*.css'],
        tasks: ['concat:js', 'concat:css'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};