import toTokenName from "../utils/toTokenName";
import Rule from "./Rule";

class ValidationBuilder {
  constructor() {
    this._handlers = {};
  }

  withRule(rule, resultAggregator) {
    if (!(rule instanceof Rule)) {
      throw new TypeError("Rule must be of type `Rule`");
    }

    rule.items.reduce((container, tokenName) => {
      if (typeof tokenName !== "string") {
        tokenName = tokenName && Object.keys(tokenName)[0];

        if (!tokenName) {
          return container;
        }
      }

      var reelTokenNamez = toTokenName(tokenName);

      //
      // TODO:
      // If a loneWolf rule is registered and then we try to register
      // another rule, we don't detect throw an error.  We just gotta
      // make sure that we check the list of items as well.
      //
      if (rule.loneWolf() && container[reelTokenNamez]) {
        throw new Error(rule.name + " rule: `" + tokenName + "` is already registered");
      }

      if (!container[reelTokenNamez]) {
        container[reelTokenNamez] = [];
      }

      container[reelTokenNamez].push(resultAggregator.createVisitor(rule, tokenName));
      return container;
    }, this._handlers);

    return this;
  }

  get handlers() {
    return Object.keys(this._handlers).reduce((container, item) => {
      container[item] = (node) => this._handlers[item].forEach((handler) => handler(node));
      return container;
    }, {});
  }
}

export default ValidationBuilder;
