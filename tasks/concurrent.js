module.exports = {
  test: {
    tasks: ['connect:test', 'watch:test'],
    options: {
      logConcurrentOutput : true
    }
  },
  site: {
    tasks: ['connect:site', 'watch:site'],
    options: {
      logConcurrentOutput : true
    }
  }
};
