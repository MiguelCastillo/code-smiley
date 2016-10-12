import { parse } from "acorn";
import { simple } from "acorn/dist/walk";
import toTokenCode from "../utils/toTokenCode";
import ValidationResult from "./ValidationResult";

var defaultOptions = {
  locations: true
};

class Validation {
  constructor() {
    this._rules = [];
  }

  withRule(rule) {
    this._rules.push(rule);
    return this;
  }

  parse(source, options = defaultOptions) {
    this._ast = parse(source, options);
    return this;
  }

  validate() {
    if (!this._ast) {
      throw new Error("Must call `parse` with source in order to run validation");
    }

    var resultAccumulator = new ValidationResult.Accumulator();
    simple(this._ast, nodeVisitors(this._rules, resultAccumulator));
    return resultAccumulator.results;
  }
}

function nodeVisitors(rules, resultAccumulator) {
  //
  // Create visitors for all the rules.
  //
  var rulesVisitors = rules.reduce((visitors, rule) => {
    return getRuleVisitors(visitors, rule, resultAccumulator);
  }, {});

  //
  // reduce all rule visitors to be single wrapping functions for each token that
  // acorn can call. When the wrapping functions is called by acorn, then all rule
  // validation functions for the particular token are in turned called to process
  // the particular nodes.
  //
  var nodeVisitors = Object.keys(rulesVisitors).reduce((visitors, tokenName) => {
    visitors[tokenName] = (node) => rulesVisitors[tokenName].forEach((handler) => handler(node));
    return visitors;
  }, {});

  return nodeVisitors;
}

function getRuleVisitors(visitors, rule, resultAccumulator) {
  rule.items.forEach((tokenName) => {
    if (typeof tokenName !== "string") {
      tokenName = tokenName && Object.keys(tokenName)[0];

      if (!tokenName) {
        return;
      }
    }

    var tokenCode = toTokenCode(tokenName);

    //
    // TODO:
    // If a loneWolf rule is registered and then we try to register
    // another rule, we don't detect throw an error.  We just gotta
    // make sure that we check the list of items as well.
    //
    if (rule.loneWolf() && visitors[tokenCode]) {
      throw new Error(rule.name + " rule: `" + tokenName + "` is already registered");
    }

    if (!visitors[tokenCode]) {
      visitors[tokenCode] = [];
    }

    visitors[tokenCode].push(resultAccumulator.createVisitor(tokenName, rule));
  });

  return visitors;
}

export default Validation;
