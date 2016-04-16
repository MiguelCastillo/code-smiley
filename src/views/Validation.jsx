import React from "react";

class ValidationItem extends React.Component {
  render() {
    var { rule, validation, result } = this.props.item;
    var className = ["validation-item"];

    if (result !== true) {
      className.push("is-invalid");
    }

    return (
      <li className={className} >
        {rule}: [{validation}] {result}
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
