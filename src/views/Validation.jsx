import React from "react";

class ValidationLocation extends React.Component {
  render() {
    if (!this.props.location) {
      return null;
    }

    return (
      <span className="validation-location">[{this.props.location.line + ":" + (this.props.location.column + 1)}]</span>
    );
  }
}

class ValidationItem extends React.Component {
  render() {
    var { ruleName, tokenName, result, node } = this.props.item;
    var location = node && node.loc.start;
    var className = ["validation-item"];

    if (result !== true) {
      className.push("is-invalid");
    }

    return (
      <li className={className} >
        {ruleName}: [{tokenName}] {<ValidationLocation location={location}/>} {result}
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
