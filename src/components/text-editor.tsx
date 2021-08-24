import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        // console.log("elemnt clicked is within the md editor")
        return;
      }
      setIsEdit(false);
    };

    document.addEventListener(
      "click",
      listener,
      // new in React17
      { capture: true }
    );

    return () => {
      // onMount || rerender&useEffect called
      document.removeEventListener(
        "click",
        listener,
        // new in React17
        { capture: true }
      );
    };
  }, []);

  if (isEdit) {
    return (
      // useRef for comparison
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  } else {
    return (
      <div onClick={() => setIsEdit(true)}>
        <MDEditor.Markdown source={"# Header"} />
      </div>
    );
  }
};

export default TextEditor;
