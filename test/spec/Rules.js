import Rules from "../../src/Rules";
import { expect } from "chai";

describe("Test suite", function () {
  describe("When creating a Rules", function() {
    var rules;
    beforeEach(function () {
      rules = new Rules();
    });

    describe("and parsing a simple input", function() {
      var result, source;

      beforeEach(function() {
        source = "var x = 1;";
        result = rules.parse(source);
      })

      it("then an AST is created with type Program", function() {
        expect(result.type).to.equal("Program");
      });
    });
  });
});
