import toArray from "./utils/toArray";
import Validation from "./validation/Validation";
import Whitelist from "./rules/Whitelist";
import Blacklist from "./rules/Blacklist";
import Structure from "./rules/Structure";

class CodeSmiley {
  constructor() {
    this._whitelist = new Whitelist();
    this._blacklist = new Blacklist();
    this._structure = new Structure();
  }

  parse(source, options) {
    return new Validation()
      .withRule(this._whitelist)
      .withRule(this._blacklist)
      .withRule(this._structure)
      .parse(source, options)
      .validate();
  }

  include(tokenNames) {
    this._whitelist.add(toArray(tokenNames));
    return this;
  }

  exclude(tokenNames) {
    this._blacklist.add(toArray(tokenNames));
    return this;
  }

  structure(tree) {
    this._structure.add(toArray(tree));
    return this;
  }
}

export default CodeSmiley;
