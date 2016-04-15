class ValidationBuilder {
  constructor() {
    this.handlers = {};
  }

  withRules(rules, handler) {
    rules.reduce((container, tokenName) => {
      if (container[tokenName]) {
        throw new Error(tokenName + " is already registered");
      }

      container[tokenName] = handler;
      return container;
    }, this.handlers);

    return this;
  }

  static messageAggregator(container) {
    return function(node) {
      if (!container[node.type]) {
        container[node.type] = { items: [] };
      }

      container[node.type].items.push(node);
    };
  }
}

export default ValidationBuilder;
