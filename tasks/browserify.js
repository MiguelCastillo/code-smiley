var date = new Date();
var today = date.toDateString() + ' ' + date.toLocaleTimeString();
var banner = "/*! <%= pkg.name %> v<%= pkg.version %> - " + today + ". (c) " + date.getFullYear() + " Miguel Castillo. */";

module.exports = {
  site: {
    dest: "dist/index.js",
    src: "src/index.js",
    options: {
      banner: banner,
      transform: [["babelify", { presets: ["react", "es2015"] }]],
      browserifyOptions: {
      }
    }
  },
  test: {
    dest: "dist/unit-test.js",
    src: "test/SpecRunner.js",
    options: {
      banner: banner,
      transform: [["babelify", { presets: ["react", "es2015"] }]],
      browserifyOptions: {
      }
    }
  }
};
