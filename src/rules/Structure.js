import { simple } from "acorn/dist/walk";
import toTokenCode from "../utils/toTokenCode";
import Rule from "../validation/Rule";
import ResultAggregatorFactory from "../validation/ResultAggregatorFactory";

class Structure extends Rule {
  constructor() {
    super("structure");
  }

  validate(tokenName, node) {
    return traverse(node, this.items[0]) || "Code structure does not match your specified rules";
  }
}

function traverse(parent, tree = {}) {
  if (!Object.keys(tree).length) {
    return true;
  }

  var resultAggregator = ResultAggregatorFactory.create();

  var visitors = Object.keys(tree).reduce((container, item) => {
    container[toTokenCode(item)] = resultAggregator.createVisitor(item);
    return container;
  }, {});

  if (Object.keys(visitors).length) {
    simple(parent, visitors);
  }

  var results = resultAggregator.results;

  if (!results.length) {
    return false;
  }

  return results.some((result) => traverse(result.node.body || result.node.consequent, tree[result.tokenName]));
}

export default Structure;
