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
}

export default ValidationResult;
