import { ResizableBox } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  //
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      // cheat the 100% problem
      width={Infinity}
      height={300}
      resizeHandles={["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
