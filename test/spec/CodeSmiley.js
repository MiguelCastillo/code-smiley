import Rules from "../../src/CodeSmiley";
import { expect } from "chai";

describe("CodeSmiley test suite", function () {
  describe("When creating a Rules", function() {
    var rules, source, result;

    beforeEach(function () {
      rules = new Rules();
    });

    describe("and parsing a simple input with no rules", function() {
      beforeEach(function() {
        source = "var x = 1;";
        result = rules.parse(source);
      });

      it("then no validation failures are reported", function() {
        expect(result.matches).to.be.empty;
      });
    });

    describe("and adding inclusion rules", function() {
      var includes, excludes, structure, validation;
      var act = () => validation = rules.include(includes).exclude(excludes).structure(structure).parse(source);

      beforeEach(function() {
        includes = [];
        excludes = [];
        structure = {};
      });

      describe("and inclusion rules are met", function() {
        beforeEach(function() {
          source = "var x = 32;";
          includes = ["variable declaration"];
          act();
        });

        it("then there are matches for inclusion rules", function() {
          matchArrayItem(validation.matches, {
            ruleName: "whitelist",
            result: true,
            tokenName: "variable declaration"
          });
        });
      });

      describe("and exclusion rules are met", function() {
        beforeEach(function() {
          source = "var x = 32;";
          excludes = ["variable declaration"];
          act();
        });

        it("then there are matches for exclusion rules", function() {
          matchArrayItem(validation.matches, {
            ruleName: "blacklist",
            result: "variable declaration must not appear in your code",
            tokenName: "variable declaration"
          });
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
          matchArrayItem(validation.matches, {
            ruleName: "blacklist",
            result: "for statement must not appear in your code",
            tokenName: "for statement"
          });
        });

        it("then there are matches for inclusion rules", function() {
          matchArrayItem(validation.matches, {
            ruleName: "whitelist",
            result: true,
            tokenName: "variable declaration"
          });
        });
      });

      describe("and exclusion and inclusion define the same rule", function() {
        beforeEach(function() {
          source = "var x = 32;";
          includes = ["variable declaration"];
          excludes = ["variable declaration"];
        });

        it("then an exception is thrown", function() {
          expect(act).to.throw(Error, "blacklist rule: `variable declaration` is already registered");
        });
      });

      describe("and matching the shape of a valid structure", function() {
        beforeEach(function() {
          source = "for(var y = 12; y < 0; y++) { if (y === 12) { while(y) {  } } }";
          structure = {
            "for statement": {
              "if statement": {
                "while statement": {
                }
              }
            }
          };

          act();
        });

        it("then shape is matched", function() {
          matchArrayItem(validation.matches, {
            result: true,
            ruleName: "structure",
            tokenName: "for statement"
          });
        });
      });

      describe("and matching the shape of a not valid structure", function() {
        beforeEach(function() {
          source = "for(var y = 12; y < 0; y++) { if (y === 12) { while(y) {  } } }";
          structure = {
            "for statement": {
              "if statement": {
                "while statement": {
                  "variable declaration": {
                  }
                }
              }
            }
          };

          act();
        });

        it("then shape is NOT matched", function() {
          matchArrayItem(validation.matches, {
            result: "Code structure does not match your specified rules",
            ruleName: "structure",
            tokenName: "for statement"
          });
        });
      });
    });
  });
});

function matchArrayItem(array, item) {
  var keys = Object.keys(item);

  var result = array.find(entry => {
    return !keys.some(key => item[key] !== entry[key]);
  });

  if (!result) {
    throw new Error("Unable to find criteria in array.\n" + JSON.stringify(item) + "\n" + JSON.stringify(array));
  }
}
