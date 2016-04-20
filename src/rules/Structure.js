import { recursive } from "acorn/dist/walk";
import toTokenCode from "../utils/toTokenCode";
import isObjectEmpty from "../utils/isObjectEmpty";
import Rule from "../validation/Rule";
import ResultAggregatorFactory from "../validation/ResultAggregatorFactory";

class Structure extends Rule {
  constructor() {
    super("structure");
  }

  validate(tokenName, astNode) {
    return traverse(this.items[0], astNode) || "Code structure does not match your specified rules";
  }
}

function traverse(tokenTree, astNode) {
  if (isObjectEmpty(tokenTree)) {
    return true;
  }

  var resultAggregator = ResultAggregatorFactory.create();
  var visitors = buildVisitorMap(tokenTree, resultAggregator);

  if (!isObjectEmpty(visitors)) {
    recursive(astNode, null, visitors);
  }

  return resultAggregator.results.some((result) => traverse(tokenTree[result.tokenName], result.node.body || result.node.consequent));
}

function buildVisitorMap(tokenTree, resultAggregator) {
  return Object.keys(tokenTree).reduce((container, item) => {
    container[toTokenCode(item)] = resultAggregator.createVisitor(item);
    return container;
  }, {});
}

export default Structure;
