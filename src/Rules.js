import { parse } from "acorn";
import { simple } from "acorn/dist/walk";
import toArray from "./utils/toArray";
import toTokenName from "./utils/toTokenName";
import ValidationBuilder from "./ValidationBuilder";

var defaultOptions = {
  locations: true
};

class Rules {
  constructor() {
    this._blacklist = [];
    this._whitelist = [];
    this._tree = {};
  }

  parse(source, options = defaultOptions) {
    this._ast = parse(source, options);
    return this;
  }

  include(tokenNames) {
    tokenNames = toArray(tokenNames);
    this._whitelist = this._whitelist.concat(tokenNames);
    return this;
  }

  exclude(tokenNames) {
    tokenNames = toArray(tokenNames);
    this._blacklist = this._blacklist.concat(tokenNames);
    return this;
  }

  structure(tree) {
    this._tree = tree;
    return this;
  }

  validate() {
    if (!this._ast) {
      throw new Error("Must call `parse` with source in order to run validation");
    }

    var blacklistResult = {};
    var whitelistResult = {};

    var validationRules = new ValidationBuilder()
      .withRules(this._blacklist, ValidationBuilder.messageAggregator(blacklistResult))
      .withRules(this._whitelist, ValidationBuilder.messageAggregator(whitelistResult));

    simple(this._ast, validationRules.handlers);

    return {
      structure: traverse(this._ast, this._tree),
      blacklistResult,
      whitelistResult
    };
  }
}

function traverse(parent, tree) {
  if (!Object.keys(tree || {}).length) {
    return true;
  }

  var results = [];

  var visitor = function(item) {
    return function(node) {
      results.push({node, item});
    };
  };

  var visitors = Object.keys(tree).reduce((container, item) => {
    container[toTokenName(item)] = visitor(item);
    return container;
  }, {});

  if (Object.keys(visitors).length) {
    simple(parent, visitors);
  }

  return results.length && results.some((result) => traverse(result.node.body || result.node.consequent, tree[result.item]));
}

export default Rules;
