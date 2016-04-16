var env = require("./env");

module.exports = {
  test: {
    files: ['src/**/*.js', 'test/**/*.js', '*.js'],
    tasks: ['build-test'],
    options: {
      livereload: env.testLivereloadPortNumber
    }
  },
  site: {
    files: ['src/**/*.*(js|jsx|css)', '*.js'],
    tasks: ['build-site'],
    options: {
      livereload: env.siteLivereloadPortNumber
    }
  }
};
