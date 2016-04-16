import { parse } from "acorn";
import { simple } from "acorn/dist/walk";
import ResultAggregatorFactory from "./ResultAggregatorFactory";
import ValidationBuilder from "./ValidationBuilder";

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

    var resultAggregator = ResultAggregatorFactory.create();
    var validators = new ValidationBuilder();
    this._rules.forEach((rule) => validators.withRule(rule, resultAggregator));
    simple(this._ast, validators.handlers);
    return resultAggregator.results;
  }
}

export default Validation;
