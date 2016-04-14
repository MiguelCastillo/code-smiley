import DOMReady from "./utils/DOMReady";
// import { parse } from "acorn";

DOMReady(() => {
  document.getElementById("app").innerHTML = "We have a place in the dom!";
});
