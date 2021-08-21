import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div
    // className={"app"}
    // style={{ height: "100%", display: "flex", flexDirection: "row" }}
    >
      <CodeCell />
      {/* <CodeCell /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
