import React from "react";

const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      result: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.keyCode);

    switch (event.keyCode) {
      case 13:
        this.setState({
          input: event.target.value,
          result: eval(this.state.input)
        });
        break;
      default:
        this.setState({
          input: event.target.value
        });
        break;
    }
  }

  handleClick(event) {}

  componentDidMount() {
    document.addEventListener("keydown", this.handleChange, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleChange, false);
  }

  render() {
    const buttonList = nums.map((elem, i) => {
      let item = (
        <button
          id={elem}
          className="num-button"
          onClick={this.handleClick}
          onKeyPress={this.handleKeyPress}
        >
          {i}
        </button>
      );
      return item;
    });

    return (
      <div id="display-div">
        <h6>{this.state.input}</h6>
        <h6>{this.state.result}</h6>
        <input
          type="text"
          id="display"
          value={this.state.input}
          onChange={this.handleChange}
        ></input>
        <hr></hr>
        <button className="num-button" id="equals" onClick={this.handleClick}>
          =
        </button>
        <button className="num-button" id="add" onClick={this.handleClick}>
          +
        </button>
        <button className="num-button" id="subtract" onClick={this.handleClick}>
          -
        </button>
        <button className="num-button" id="multiply" onClick={this.handleClick}>
          *
        </button>
        <button className="num-button" id="divide" onClick={this.handleClick}>
          /
        </button>
        <button className="num-button" id="decimal" onClick={this.handleClick}>
          .
        </button>
        <button className="num-button" id="clear" onClick={this.handleClick}>
          C
        </button>
        <hr></hr>
        {buttonList}
      </div>
    );
  }
}

export default Calculator;
