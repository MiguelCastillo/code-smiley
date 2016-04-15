import Rules from "../../src/Rules";
import { expect } from "chai";

describe("Rules test suite", function () {
  describe("When creating a Rules", function() {
    var rules, source, result;

    beforeEach(function () {
      rules = new Rules();
    });

    describe("and parsing a simple input", function() {
      beforeEach(function() {
        source = "var x = 1;";
        result = rules.parse(source);
      });

      it("then an AST is created with type Program", function() {
        expect(result._ast.type).to.equal("Program");
      });
    });

    describe("and adding inclusion rules", function() {
      var includes, excludes, validation;
      var act = () => validation = rules.include(includes).exclude(excludes).parse(source).validate();

      describe("and inclusion rules are met", function() {
        beforeEach(function() {
          source = "var x = 32;";
          excludes = [];
          includes = ["variable declaration"];
          act();
        });

        it("then there are NO matches for exclusion rules", function() {
          expect(validation.blacklistResult).to.be.empty;
        });

        it("then there are matches for inclusion rules", function() {
          expect(validation.whitelistResult).to.not.be.empty;
        });
      });

      describe("and exclusion rules are met", function() {
        beforeEach(function() {
          source = "var x = 32;";
          includes = [];
          excludes = ["variable declaration"];
          act();
        });

        it("then there are matches for exclusion rules", function() {
          expect(validation.blacklistResult).to.not.be.empty;
        });

        it("then there are NO matches for inclusion rules", function() {
          expect(validation.whitelistResult).to.be.empty;
        });
      });

      describe("and exclusion and inclusion rules are met", function() {
        beforeEach(function() {
          source = "var x = 32; for(x; x <3; x++) {}";
          includes = ["variable declaration"];
          excludes = ["for statement"];
          act();
        });

        it("then there are matches for exclusion rules", function() {
          expect(validation.blacklistResult).to.not.be.empty;
        });

        it("then there are matches for inclusion rules", function() {
          expect(validation.whitelistResult).to.not.be.empty;
        });
      });

      describe("and exclusion and inclusion define the same rule", function() {
        beforeEach(function() {
          source = "var x = 32;";
          includes = ["variable declaration"];
          excludes = ["variable declaration"];
        });

        it("then an exception is thrown", function() {
          expect(act).to.throw(Error, "VariableDeclaration is already registered");
        });
      });

    });
  });
});
