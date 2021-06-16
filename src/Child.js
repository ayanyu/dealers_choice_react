import React from "react";
const { Component } = React;
import ReactDOM from "react-dom";
import axios from "axios";

class Child extends Component {
  constructor() {
    super();
    this.state = {
      child: {},
    };
  }
  async componentDidUpdate(prop) {
    if (prop.selectedId !== this.props.selectId) {
      const child = await (
        await axios.get(`api/children/${this.props.selectId}`)
      ).data;
      this.setState({ child });
    }
  }

  async componentDidMount() {
    const child = await (
      await axios.get(`api/children/${this.props.selectId}`)
    ).data;
    this.setState({ child });
    }

  render() {
    const { child } = this.state;
    return <div>{child.toy}</div>;
  }
}
export default Child;