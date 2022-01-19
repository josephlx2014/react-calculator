import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onIncrement, onDecrement, onIncrementBy10 } = this.props;

    return (
      <div>
        <h1>Clicked: {value} times</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrementBy10}>+10</button>
      </div>
    );
  }
}

export default Counter;
