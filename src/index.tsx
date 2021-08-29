import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./reduxStore";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <Provider store={store}>
      <div
      // className={"app"}
      // style={{ height: "100%", display: "flex", flexDirection: "row" }}
      >
        {/* <CodeCell /> */}
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
