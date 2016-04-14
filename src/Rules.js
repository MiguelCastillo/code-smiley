import { parse } from "acorn";

class Rules {
  constructor() {
  }

  parse(source) {
    return parse(source);
  }
}

export default Rules;
