import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MonacoEditor
      // includes syntax-highlight, intellisense ect
      language={"javascript"}
      theme={"dark"}
      height={"500px"}
    />
  );
};

export default CodeEditor;
