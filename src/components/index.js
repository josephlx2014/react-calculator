import React from "react";

class DisplayScr extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.submitNewFormula(event.target.value);
  }

  render() {
    return (
      <div id="display-div">
        <h6>{this.props.formula}</h6>
        <input
          type="text"
          id="display"
          value={this.props.formula}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

export default DisplayScr;
