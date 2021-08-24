import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";

const TextEditor: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // effect
    const listener = () => {
      setIsEdit(false);
    };

    document.addEventListener(
      "click",
      listener,
      // new in React17
      { capture: true }
    );

    return () => {
      // cleanup
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
      <div>
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
