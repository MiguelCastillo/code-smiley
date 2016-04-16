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
  .exclude(["while statement"]);

DOMReady(() => {
  var tokenDefinitionsArray = Object.keys(tokenDefinitions).map((i) => tokenDefinitions[i])

  ReactDOM.render(
    <App validation={validation} tokenDefinitions={tokenDefinitionsArray}/>,
    document.getElementById("app")
  );
});
