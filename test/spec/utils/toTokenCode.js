import toTokenCode from "../../../src/utils/toTokenCode";
import { expect } from "chai";

describe("toTokenCode test suite", function () {
  describe("When parsing a two word token name", function() {
    var input, result;

    beforeEach(function() {
      input = "variable   declaration";
      result = toTokenCode(input);
    });

    it("then the generated token name is `VariableDeclaration`", function() {
      expect(result).to.equal("VariableDeclaration");
    });
  });

  describe("When parsing a token name that's already in proper form", function() {
    var input, result;

    beforeEach(function() {
      input = "VariableDeclaration";
      result = toTokenCode(input);
    });

    it("then the generated token name is `VariableDeclaration`", function() {
      expect(result).to.equal("VariableDeclaration");
    });
  });
});
