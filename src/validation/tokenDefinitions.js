import { base } from "acorn/dist/walk";
import toTokenFriendlyName from "../utils/toTokenFriendlyName";

var TokenDefinitions = Object.keys(base).reduce((container, code) => {
  var name = toTokenFriendlyName(code);
  container[name] = { name, code };
  return container;
}, {});

export default TokenDefinitions;

