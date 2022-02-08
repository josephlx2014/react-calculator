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
let temp = "";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: [],
      result: "0"
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //  console.log(event.target.value);

    switch (event.target.value) {
      //enter
      case "equals":
        let expression = this.state.formula.join("");
        let finalResult = eval(expression);
        console.log(expression + "=" + finalResult);

        this.setState({ result: finalResult });
        break;

      //clear
      case "clear":
        this.setState({
          formula: [],
          result: "0"
        });
        temp = "";
        break;

      default:
        //IF HERE !!!!!
        if (
          event.target.value === "add" ||
          event.target.value === "subtract" ||
          event.target.value === "divide" ||
          event.target.value === "multiply"
        ) {
          this.setState({
            formula: [...this.state.formula, event.target.innerText],
            result: event.target.innerText
          });
          temp = "";
          //ELSE IF!!!!!!!!!!!!!!!!!!!!!!!!
        }

        //check for multiple periods

        /* try {
            if (matches.length < 2) {
              if (test === false) {
                this.setState({
                  formula: [...this.state.formula, event.target.innerText],
                  result: temp
                });
              }
            }
          } catch (error) {
            console.error(error);
          }*/
        //ELSE!!!
        else {
          temp += event.target.innerText;
          //code to find multiple zeroes at the beginning
          const regex = /(^[0])/;
          let test = regex.test(temp);
          //code to check for multiple periods
          const regex2 = /(.\..{2,})/g;
          let test2 = regex2.test(temp);
          //console.log(test2 + " " + temp);
          //console.log(test + temp);

          if (test2 === true) {
          }

          //console.log("tempCleaned " + temp);

          if (test === false) {
            this.setState({
              formula: [...this.state.formula, event.target.innerText],
              result: temp
            });
          } else {
            this.setState({
              result: "0"
            });
            temp = "";
          }
        }
        break;
    }
  }

  handleKeyPress(event) {
    /*
    switch (event.keyCode) {
      //enter
      case 13:
        let expression = this.state.formula.join("");
        console.log(expression + "=" + eval(expression));
        break;

      //clear
      case 67:
        this.setState({
          formula: [],
          result: ""
        });
        temp = "";
        break;

      default:
        if (
          event.key === "+" ||
          event.key === "-" ||
          event.key === "/" ||
          event.key === "*"
        ) {
          this.setState({
            formula: [...this.state.formula, event.key],
            result: event.key
          });
          temp = "";
        } else {
          temp += event.key;
          this.setState({
            formula: [...this.state.formula, event.key],
            result: temp
          });
        }

        console.log(this.state.formula);
        break;
    }*/
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    function createOperationtHtml(inputArr) {
      return {
        __html: "<h5> (on +-/*)operation: " + inputArr.join("") + "</h5>"
      };
    }
    function createResultHtml(result) {
      return {
        __html: "<h5> (enter) result: " + result + "</h5>"
      };
    }

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
        <div onKeyPress={this.handleKeyPress}>
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
            value="add"
            onClick={this.handleClick}
          >
            +
          </button>
          <button
            className="num-button"
            id="subtract"
            value="subtract"
            onClick={this.handleClick}
          >
            -
          </button>
          <button
            className="num-button"
            id="multiply"
            value="multiply"
            onClick={this.handleClick}
          >
            *
          </button>
          <button
            className="num-button"
            id="divide"
            value="divide"
            onClick={this.handleClick}
          >
            /
          </button>
          <button
            className="num-button"
            id="decimal"
            value="decimal"
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
