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

let input = "";
let decimalCounter = 0;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      temp: "",
      result: "0"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //  console.log(event.target.value);
    switch (event.target.value) {
      //clear
      case "clear":
        this.setState({
          formula: [],
          temp: "",
          result: "0"
        });
        decimalCounter = 0;
        input = "";
        break;

      case "+":
      case "-":
      case "/":
      case "*":
        decimalCounter = 0;
        input += event.target.value;
        this.setState({
          result: input
        });

        break;
      default:
        const regex = /(^[0])/;

        //validate multiple decimal points
        if (decimalCounter === 0 && event.target.id === "decimal") {
          //console.log("decimalC 0 y viene un buton decimal");
          input += event.target.value;

          decimalCounter = 1;
        } else if (decimalCounter === 1) {
          if (event.target.id !== "decimal") {
            //console.log("decimalC 1 y viene otro tipo de boton");
            input += event.target.value;
          }
        } else {
          input += event.target.value;

          let zeroesTest = regex.test(input);
          if (zeroesTest === true) {
            //console.log("before " + input);
            let newInput = "";
            if (input.length > 1) {
              newInput = input.slice(0, -1);
            } else {
              newInput = 0;
            }
            //console.log("after " + newInput);
            input = newInput;
          }
        }

        this.setState({
          result: input
        });

        break;
    }
  }

  render() {
    function createOperationtHtmlTests(inputArr) {
      return {
        __html: "<h5>" + inputArr.join("") + "</h5>"
      };
    }

    function createResultHtmlTests(result) {
      return {
        __html: "<h5>" + result + "</h5>"
      };
    }

    const buttonList = nums.map((elem, i) => {
      let item = (
        <button
          id={elem}
          key={i}
          className="num-button"
          value={i}
          onClick={this.handleClick}
        >
          {i}
        </button>
      );
      return item;
    });

    return (
      <div id="display-div">
        <div
          id="operation"
          dangerouslySetInnerHTML={createOperationtHtmlTests(
            this.state.formula
          )}
        ></div>

        <div
          id="display"
          dangerouslySetInnerHTML={createResultHtmlTests(this.state.result)}
        ></div>

        <hr></hr>
        <div>
          <button
            className="num-button"
            id="equals"
            value="equals"
            onClick={this.handleClick}
          >
            =
          </button>
          <button
            className="num-button"
            id="add"
            value="+"
            onClick={this.handleClick}
          >
            +
          </button>
          <button
            className="num-button"
            id="subtract"
            value="-"
            onClick={this.handleClick}
          >
            -
          </button>
          <button
            className="num-button"
            id="multiply"
            value="*"
            onClick={this.handleClick}
          >
            *
          </button>
          <button
            className="num-button"
            id="divide"
            value="/"
            onClick={this.handleClick}
          >
            /
          </button>
          <button
            className="num-button"
            id="decimal"
            value="."
            onClick={this.handleClick}
          >
            .
          </button>
          <button
            className="num-button"
            id="clear"
            value="clear"
            onClick={this.handleClick}
          >
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
