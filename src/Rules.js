import { parse, tokTypes } from "acorn";
import { simple } from "acorn/dist/walk";
import toArray from "./utils/toArray";
import toTokenName from "./utils/toTokenName";
import ValidationBuilder from './ValidationBuilder';

var defaultOptions = {
  locations: true
};

class Rules {
  constructor() {
    this._blacklist = [];
    this._whitelist = [];
  }

  parse(source, options = defaultOptions) {
    this._ast = parse(source, options);
    return this;
  }

  include(tokenNames) {
    tokenNames = toArray(tokenNames).map(toTokenName);
    this._whitelist = this._whitelist.concat(tokenNames);
    return this;
  }

  exclude(tokenNames) {
    tokenNames = toArray(tokenNames).map(toTokenName);
    this._blacklist = this._blacklist.concat(tokenNames);
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
      blacklistResult,
      whitelistResult
    };
  }
}

export default Rules;
