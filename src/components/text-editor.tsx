import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
const TextEditor: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("# header");
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
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  } else {
    return (
      <div className="text-editor card" onClick={() => setIsEdit(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
