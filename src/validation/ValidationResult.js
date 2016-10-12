class Accumulator {
  constructor() {
    this.results = [];
  }

  createVisitor(tokenName, rule = null) {
    return (node) => {
      var result = rule ? rule.validate(tokenName, node) : false;
      var ruleName = rule && rule.name;
      var validationResult = new ValidationResult(ruleName, result);

      validationResult
        .withNode(node)
        .withTokenName(tokenName);

      this.results.push(validationResult);
    };
  }
}

class ValidationResult {
  constructor(ruleName, result) {
    this.ruleName = ruleName;
    this.result = result;
  }

  withNode(node) {
    this.node = node;
    return this;
  }

  withTokenName(tokenName) {
    this.tokenName = tokenName;
    return this;
  }

  static get Accumulator() {
    return Accumulator;
  }
}

export default ValidationResult;
