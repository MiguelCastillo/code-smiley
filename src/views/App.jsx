import React from "react";
import CodeEditor from "./CodeEditor";
import Validation from "./Validation";
import TokenDefinitions from "./TokenDefinitions";

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      validation: this.props.validation.parse(this.props.sourceCode || "")
    });
  }

  render() {
    return (
      <div className="app">
        <CodeEditor onChange={this.onEditorChange.bind(this)} value={this.props.sourceCode}/>
        <br/>
        <h3>Failures</h3>
        <Validation results={this.state.validation.failures} />
        <br/>
        <h3>Matches</h3>
        <Validation results={this.state.validation.matches} />
        <br/>
        <TokenDefinitions tokenDefinitions={this.props.tokenDefinitions} />
      </div>
    );
  }

  onEditorChange(cm /*, changes*/) {
    try {
      this.setState({
        validation: this.props.validation.parse(cm.doc.getValue())
      });
    }
    catch(ex) {
    }
  }
}

export default App;
