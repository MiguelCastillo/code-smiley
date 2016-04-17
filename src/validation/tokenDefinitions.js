import { base } from "acorn/dist/walk";
import toTokenName from "../utils/toTokenName";

var tokenDefinitions = Object.keys(base).reduce((container, code) => {
  var name = toTokenName(code);
  container[code] = { name, code };
  return container;
}, {});

export default tokenDefinitions;

