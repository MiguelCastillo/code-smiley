import "./utils/arrayFind";
import React from "react";
import ReactDOM from "react-dom";
import DOMReady from "./utils/DOMReady";
import App from "./views/App";
import Validation from "./CodeSmiley";
import tokenDefinitions from "./validation/tokenDefinitions";

var validation = new Validation();

validation
  .include(["variable declaration", "if statement"])
  .exclude(["while statement"])
  .structure({
    "for statement": {
      "variable declaration": {}
    }
  });

// Some random default sample code
var sourceCode = `var x = 10;

for(var i = 0; i < 81; i++) {
  var s = 2;

  function tt() {
    if (i) {
      console.log(i);
    }
  }
}

while(x === 10) {
  console.log('invalid code');
}
`;

DOMReady(() => {
  var tokenDefinitionsArray = Object.keys(tokenDefinitions).map((i) => tokenDefinitions[i]);

  ReactDOM.render(
    <App validation={validation} tokenDefinitions={tokenDefinitionsArray} sourceCode={sourceCode}/>,
    document.getElementById("app")
  );
});
