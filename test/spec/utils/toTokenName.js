import toTokenName from "../../../src/utils/toTokenName";
import { expect } from "chai";

describe("toTokenName test suite", function () {
  describe("When parsing a two word token name", function() {
    var input, result;

    beforeEach(function() {
      input = "variable   declaration";
      result = toTokenName(input);
    });

    it("then the generated token name is `VariableDeclaration`", function() {
      expect(result).to.equal("VariableDeclaration");
    });
  });

  describe("When parsing a token name that's already in proper form", function() {
    var input, result;

    beforeEach(function() {
      input = "VariableDeclaration";
      result = toTokenName(input);
    });

    it("then the generated token name is `VariableDeclaration`", function() {
      expect(result).to.equal("VariableDeclaration");
    });
  });
});
