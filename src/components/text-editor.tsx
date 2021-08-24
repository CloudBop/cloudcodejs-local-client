import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const TextEditor: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

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
