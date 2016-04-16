import React from "react";
import List from "./List";

class TokenDefinition extends React.Component {
  render() {
    var { token } = this.props;

    return (
      <List.Sub className="token-definition">
        <List.Item>{ token.name }</List.Item><List.Item>{ token.code }</List.Item>
      </List.Sub>
    );
  }
}

class TokenDefinitions extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isExpanded: false
    };
  }

  render() {
    var className = ["token-definitions"];

    if (this.state.isExpanded) {
      className.push("is-expanded");
    }

    return (
      <div className={className.join(" ")}>
        <a href="#" onClick={this.onToggle.bind(this)}>Token Definitions</a>
        <List className="token-definition-list">
          <List.Header><List.Item>Name</List.Item><List.Item>Code</List.Item></List.Header>
          <List.Body>{ this.props.tokenDefinitions.map(i => <TokenDefinition key={i.name} token={i}/>) }</List.Body>
        </List>
      </div>
    );
  }

  onToggle() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }
}

export default TokenDefinitions;
