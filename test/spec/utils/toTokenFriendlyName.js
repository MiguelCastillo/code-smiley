import toTokenFriendlyName from "../../../src/utils/toTokenFriendlyName";
import { expect } from "chai";

describe("toTokenFriendlyName test suite", function () {
  describe("When parsing a token name", function() {
    var input, result;

    beforeEach(function() {
      input = "VariableDeclaration";
      result = toTokenFriendlyName(input);
    });

    it("then the generated token name is `variable declaration`", function() {
      expect(result).to.equal("variable declaration");
    });
  });

  describe("When parsing a token name that's already in proper form", function() {
    var input, result;

    beforeEach(function() {
      input = "variable declaration";
      result = toTokenFriendlyName(input);
    });

    it("then the generated token name is the same as the input", function() {
      expect(result).to.equal("variable declaration");
    });
  });
});
