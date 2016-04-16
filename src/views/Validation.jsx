import React from "react";

class ValidationLocation extends React.Component {
  render() {
    return (
      <span className="validation-location">{this.props.location.line + ":" + (this.props.location.column + 1)}</span>
    );
  }
}

class ValidationItem extends React.Component {
  render() {
    var { rule, validation, result, node } = this.props.item;
    var className = ["validation-item"];

    if (result !== true) {
      className.push("is-invalid");
    }

    console.log(node);

    return (
      <li className={className} >
        {rule}: [{validation}] [<ValidationLocation location={node.loc.start}/>] {result}
      </li>
    );
  }
}

class Validation extends React.Component {
  render() {
    if (!this.props.results) {
      return null;
    }

    var items = this.props.results.map((item, index) => <ValidationItem key={index} item={item}/>);

    return (
      <ul className="validation">{items}</ul>
    );
  }
}

export default Validation;
