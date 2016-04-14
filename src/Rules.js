import { parse } from "acorn";

class Rules {
  eats() {
    return "Bamboo";
  }

  parse(source) {
    return parse(source);
  }
}

export default Rules;
