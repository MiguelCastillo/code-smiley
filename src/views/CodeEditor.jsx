import React from "react";
import CodeMirror from "codemirror";

class CodeEditor extends React.Component {
  static get propTypes() {
    return {
      onClick: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      onClick: () => {}
    };
  }

  componentDidMount() {
    CodeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      change: this.onChange.bind(this)
    })
    .on("change", this.onChange.bind(this));
  }

  onChange(cm, changes) {
    this.props.onChange(cm, changes);
  }

  render() {
    return <textarea ref="editor" className="editor"></textarea>;
  }
}

export default CodeEditor;

