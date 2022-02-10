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
      formula: [""],
      temp: "",
      result: "0"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //  console.log(event.target.value);
    input += event.target.value;

    switch (event.target.value) {
      //clear
      case "clear":
        this.setState({
          formula: [],
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
        this.setState({
          //formula: [...this.state.formula, event.target.value],
          result: event.target.value
        });
        input = "";
        break;
      case "equals":
        decimalCounter = 0;
        //let generatedFormula = this.state.formula.join("");
        //console.log(this.state.formula + "  =  " + eval(generatedFormula));

        let formulaTest = [...this.state.formula, this.state.result];
        console.log(formulaTest);

        /*this.setState({
          result: eval(generatedFormula)
        });*/
        input = "";
        break;
      default:
        //
        const regexZeroes = /^[0]{1,}/;
        const regexDecimals = /.*[.].*/g; //Detects if its a decimal number
        const numbersRegex = /[1-9.]/g; // Detects only numbers from 1 to 9

        let sanitizedInput = input;
        //Zero validations

        if (regexZeroes.test(input)) {
          //&& regexDecimals.test(input) === false) {
          // console.log("Executing");
          try {
            sanitizedInput = input.match(numbersRegex);
            input = sanitizedInput.join("");
          } catch (error) {
            input = 0;
          }

          if (regexDecimals.test(input)) {
            input = "0" + input;
          }
        }

        //validate multiple decimal points
        if (decimalCounter === 0 && event.target.id === "decimal") {
          decimalCounter = 1;
        } else if (decimalCounter === 1 && event.target.id === "decimal") {
          sanitizedInput = input.slice(0, -1);
          input = sanitizedInput;
        }

        //Showing sanitized input in the display
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
