import ValidationResult from "./ValidationResult";

class ResultAggregatorFactory {
  static create() {
    var results = [];

    function createVisitor(tokenName, rule = null) {
      return function visitor(node) {
        var result = rule ? rule.validate(tokenName, node) : false;
        var ruleName = rule && rule.name;

        var validationResult = new ValidationResult(ruleName, result)
          .withNode(node)
          .withTokenName(tokenName);

        results.push(validationResult);
      };
    }

    return {
      createVisitor, results
    };
  }
}

export default ResultAggregatorFactory;
