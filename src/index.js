import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Counter from "./components/Counter";
import counter from "./reducers";

const store = createStore(counter);
const rootElement = document.getElementById("root");

const render = () =>
  ReactDOM.render(
    <StrictMode>
      <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: "INCREMENT" })}
        onDecrement={() => store.dispatch({ type: "DECREMENT" })}
        onIncrementBy10={() => store.dispatch({ type: "INCREMENTBY10" })}
      />
    </StrictMode>,
    rootElement
  );

render();
store.subscribe(render);
