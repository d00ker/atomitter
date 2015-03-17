module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    'download-atom-shell': {
      version: "0.20.3",
      outputDir: "./app",
      rebuild: true,
    },

    uglify: {
      main: {
        files: {
          'app/Atom.app/Contents/Resources/app/atomitter.min.js' : 'app/Atom.app/Contents/Resources/app/atomitter.js',
        }
      }
    },

    copy: {
      main: {
        expand: 'true',
        cwd: '../source',
        src : '*',
        dest: 'app/Atom.app/Contents/Resources/app',
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-download-atom-shell');

  grunt.registerTask('default', ['download-atom-shell', 'copy', 'uglify']);
};
