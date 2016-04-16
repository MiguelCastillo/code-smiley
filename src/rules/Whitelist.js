import Rule from "../validation/Rule";

class Whitelist extends Rule {
  constructor() {
    super("whitelist");
  }

  validate(/*tokenName, node*/) {
    return true;
  }
}

export default Whitelist;
