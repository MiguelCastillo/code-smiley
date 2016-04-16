class ResultAggregatorFactory {
  static create() {
    var results = [];

    function createVisitor(rule, validation) {
      return function visitor(node) {
        var result = rule ? rule.validate(validation, node) : false;
        var name = rule && rule.name;
        results.push({node, validation, result, rule: name});
      };
    }

    return {
      createVisitor, results
    };
  }
}

export default ResultAggregatorFactory;
