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
      input: [],
      result: 0
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case "clear":
        this.setState({
          result: 0,
          input: []
        });
        break;

      case "equals":
        const expression = this.state.input.join("");
        const resultValue = eval(expression);
        this.setState({
          result: resultValue,
          input: [resultValue]
        });
        break;

      default:
        if (
          event.key === "+" ||
          event.key === "-" ||
          event.key === "/" ||
          event.key === "*"
        ) {
          this.setState({
            input: [...this.state.input, event.key],
            result: this.state.input
          });
        } else {
          this.setState({
            input: [...this.state.input, event.key],
            result: event.key
          });
        }
        break;
    }
  }

  handleKeyPress(event) {
    //console.log(event.keyCode);
    //console.log(event.key);
    switch (event.keyCode) {
      case 13:
        const expression = this.state.input.join("");
        const resultValue = eval(expression);
        this.setState({
          result: resultValue,
          input: [resultValue]
        });
        break;
      case 8:
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 1)
        });
        break;
      case 67:
        this.setState({
          input: [],
          result: 0
        });
        break;
      default:
        this.setState({
          input: [...this.state.input, event.key]
        });
        break;
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    function createResultHtml(result) {
      return {
        __html: "<h5>" + result + "</h5>"
      };
    }
    function createOperationtHtml(inputArr) {
      return {
        __html: "<h5>" + inputArr.join("") + "</h5>"
      };
    }
    const buttonList = nums.map((elem, i) => {
      let item = (
        <button id={elem} className="num-button" onClick={this.handleClick}>
          {i}
        </button>
      );
      return item;
    });

    return (
      <div id="display-div">
        <div
          id="operation"
          dangerouslySetInnerHTML={createOperationtHtml(this.state.input)}
        ></div>
        <div
          id="display"
          dangerouslySetInnerHTML={createResultHtml(this.state.input)}
        ></div>
        <hr></hr>
        <div onKeyPress={this.handleKeyPress}>
          <button className="num-button" id="equals" onClick={this.handleClick}>
            =
          </button>
          <button className="num-button" id="add" onClick={this.handleClick}>
            +
          </button>
          <button
            className="num-button"
            id="subtract"
            onClick={this.handleClick}
          >
            -
          </button>
          <button
            className="num-button"
            id="multiply"
            onClick={this.handleClick}
          >
            *
          </button>
          <button className="num-button" id="divide" onClick={this.handleClick}>
            /
          </button>
          <button
            className="num-button"
            id="decimal"
            onClick={this.handleClick}
          >
            .
          </button>
          <button className="num-button" id="clear" onClick={this.handleClick}>
            C
          </button>
        </div>

        <hr></hr>
        {buttonList}
      </div>
    );
  }
}

export default Calculator;
