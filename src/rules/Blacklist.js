import Rule from "../validation/Rule";

class Blacklist extends Rule {
  constructor() {
    super("blacklist");
  }

  loneWolf() {
    return true;
  }

  validate(tokenName /*, node*/) {
    return tokenName + " must not appear in your code";
  }
}

export default Blacklist;
