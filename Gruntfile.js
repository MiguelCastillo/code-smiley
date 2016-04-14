module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);
  var taskConfig = require("config-grunt-tasks")(grunt, "./tasks");

  taskConfig.pkg = require("./package.json");
  grunt.initConfig(taskConfig);

  grunt.registerTask("lint", ["eslint:all"]);
  grunt.registerTask("test", ["connect:quick", "mocha:test"]);
  grunt.registerTask("build", ["build-site", "build-test"]);
  grunt.registerTask("build-test", ["eslint:all", "browserify:test"]);
  grunt.registerTask("build-site", ["eslint:all", "browserify:site", "copy:site"]);
  grunt.registerTask("serve-test", ["build-test", "concurrent:test"]);
  grunt.registerTask("serve-site", ["build-site", "concurrent:site"]);
};
