var livereload = require("connect-livereload");
var env = require("./env");

module.exports = {
  quick: {
    options: {
      port: env.testPortNumber,
      hostname: 'localhost'
    }
  },
  test: {
    options: {
      port: env.testKeepalivePortNumber,
      host: 'localhost',
      keepalive: true,
      open: 'http://localhost:' + env.testKeepalivePortNumber + '/test/SpecRunner.html',
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(livereload({ port: env.testLivereloadPortNumber }));
        return middlewares;
      }
    }
  },
  site: {
    options: {
      port: env.siteKeepalivePortNumber,
      host: 'localhost',
      keepalive: true,
      open: 'http://localhost:' + env.siteKeepalivePortNumber + '/dist/src/index.html',
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(livereload({ port: env.siteLivereloadPortNumber }));
        return middlewares;
      }
    }
  }
};
