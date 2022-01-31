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
      formula: [],
      result: "",
      temp: []
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    /*this.handleClick = this.handleClick.bind(this);*/
  }

  /*
  handleClick(event) {
    //console.log(event.target.getAttribute("data-tip"));
    const value = parseInt(event.target.getAttribute("data-tip"));
  }*/

  handleKeyPress(event) {
    console.log(event.keyCode);
    //console.log(event.key);
    switch (event.keyCode) {
      //enter
      case 13:
        const expression = this.state.formula.join("");
        const resultValue = expression; //eval(expression);

        this.setState({
          temp: [],
          formula: [],
          result: resultValue
        });
        break;

      //clear
      case 67:
        this.setState({
          temp: [],
          formula: [],
          result: ""
        });
        break;

      default:
        // console.log(event.key);
        let arr = this.state.temp;

        this.setState({
          //temp: [event.key]
          temp: [...arr, event.key]
        });

        console.log(this.state.temp.join(""));

        //when a new operation sign is added
        if (event.key === "+" || event.key === "=") {
          let newArr = this.state.formula;

          this.setState({
            formula: [this.state.formula, this.state.temp],
            temp: []
          });

          console.log(newArr.join(""));
        }
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
        __html: "<h5> (enter) result: " + result + "</h5>"
      };
    }

    function createOperationtHtml(inputArr) {
      return {
        __html: "<h5> (on +-/*)operation: " + inputArr.join("") + "</h5>"
      };
    }

    const buttonList = nums.map((elem, i) => {
      let item = (
        <button
          id={elem}
          key={i}
          className="num-button"
          data-tip={i}
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
          dangerouslySetInnerHTML={createOperationtHtml(this.state.formula)}
        ></div>

        <div
          id="display"
          dangerouslySetInnerHTML={createResultHtml(this.state.result)}
        ></div>

        <div
          id="display2"
          dangerouslySetInnerHTML={{
            __html: "(on key press)temp: " + this.state.temp
          }}
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
