import Rules from "../../src/Rules";
import { expect } from "chai";

describe("Test suite", function () {
  var pandaBear;
  beforeEach(function () {
    pandaBear = new Rules();
    sinon.stub(pandaBear, "eats").returns("Bamboo and more");
  });

  it("pandaBear.eats returns `Bamboo and more`", function() {
    expect(pandaBear.eats()).to.equal("Bamboo and more");
  });
});