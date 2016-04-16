import React from "react";
import CodeEditor from "./CodeEditor";
import Validation from "./Validation";
import TokenDefinitions from "./TokenDefinitions";

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <CodeEditor onChange={this.onEditorChange.bind(this)} />
        <br/>
        <Validation results={this.state.results} />
        <br/>
        <TokenDefinitions tokenDefinitions={this.props.tokenDefinitions} />
      </div>
    );
  }

  onEditorChange(cm /*, changes*/) {
    try {
      this.setState({
        results: this.props.validation.parse(cm.doc.getValue())
      });
    }
    catch(ex) {
    }
  }
}

export default App;
