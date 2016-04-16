import React from "react";
import CodeEditor from "./CodeEditor";
import Validation from "./Validation";

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <CodeEditor onChange={this.onEditorChange.bind(this)} />
        <Validation results={this.state.results} />
      </div>
    );
  }

  onEditorChange(cm, changes) {
    this.setState({
      results: this.props.validation.parse(cm.doc.getValue())
    });
  }
}

export default App;
