import toArray from "./utils/toArray";
import Validation from "./validation/Validation";
import ValidationResult from "./validation/ValidationResult";
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
    var results = new Validation()
      .withRule(this._whitelist)
      .withRule(this._blacklist)
      .withRule(this._structure)
      .parse(source, options)
      .validate();

    return {
      matches: results,
      failures: getFailures(this, results)
    };
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

function getFailures(codeSmiley, results) {
  var matches = results
    .reduce((container, item) => {
      if (item.ruleName === "whitelist") {
        container.whitelist[item.tokenName] = item;
      }
      else if (item.ruleName === "structure" && item.result === true) {
        container.structure[item.tokenName] = item;
      }
      else {
        container.others.push(item);
      }

      return container;
    }, {
      whitelist: {},
      structure: {},
      others: []
    });

  var whitelistMisses = codeSmiley._whitelist.items.reduce((container, item) => {
    if (!matches.whitelist[item]) {
      container.push(new ValidationResult("whitelist", "rule not found in your code").withTokenName(item));
    }

    return container;
  }, []);

  return whitelistMisses.concat(matches.others);
}

export default CodeSmiley;
