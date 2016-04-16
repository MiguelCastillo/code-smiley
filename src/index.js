import "./utils/arrayFind";
import React from "react";
import ReactDOM from "react-dom";
import DOMReady from "./utils/DOMReady";
import App from "./views/App";
import Validation from "./CodeSmiley";

var validation = new Validation();

validation
  .include(["variable declaration", "if statement"])
  .exclude(["while statement"]);

DOMReady(() => {
 ReactDOM.render(
   <App validation={validation}/>,
   document.getElementById("app")
 );
});
