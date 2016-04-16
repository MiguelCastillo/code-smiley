import React from "react";

class ListHeader extends React.Component {
  render() {
    var className = ["list-header"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return <li><ul className={className.join(" ")}>{this.props.children}</ul></li>;
  }
}

class ListBody extends React.Component {
  render() {
    var className = ["list-body"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return <li><ul className={className.join(" ")}>{this.props.children}</ul></li>;
  }
}

class ListSub extends React.Component {
  render() {
    var className = ["list-sub"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return <ul className={className.join(" ")}>{this.props.children}</ul>;
  }
}

class ListItem extends React.Component {
  render() {
    var className = ["list-item"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return <li className={className.join(" ")}>{this.props.children}</li>;
  }
}

class List extends React.Component {
  render() {
    var className = ["list"];

    if (this.props.className) {
      className.push(this.props.className);
    }

    return <ul className={className.join(" ")}>{this.props.children}</ul>;
  }

  static get Header() {
    return ListHeader;
  }

  static get Body() {
    return ListBody;
  }

  static get Item() {
    return ListItem;
  }

  static get Sub() {
    return ListSub;
  }
}

export default List;
