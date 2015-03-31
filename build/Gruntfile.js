module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    'download-atom-shell': {
      version: "0.22.3",
      outputDir: "./app",
      rebuild: true,
    },
    
    copy: {
      source: {
        expand: 'true',
        cwd: '../source',
        src : '*',
        dest: 'app/Atom.app/Contents/Resources/app',
      },
      icon: {
        expand: 'true',
        cwd: '../logo',
        src : 'atom.icns',
        dest: 'app/Atom.app/Contents/Resources/',
      }
    },

    rename: {
      atomitter: {
        src: 'app/Atom.app',
        dest: 'app/atomitter.app'
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-download-atom-shell');

  grunt.registerTask('default', ['download-atom-shell', 'copy', 'rename']);
};
