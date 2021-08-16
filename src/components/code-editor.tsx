import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount = (
    // current string value editor is set to
    getValue: () => string,
    // monacoEditorRef
    monacoEditor: any
  ) => {
    monacoEditor.onDidChangeModelContent(() => {
      // console.log(getValue());
      onChange(getValue());
    });
    // onChange();
  };
  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue} //-really an initial value
      // see monaco type defs - beware, its huge
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        // don't fade unused
        showUnused: false,
        // collapse right hand side of line numbers
        folding: false,
        //collapse left hand side of line numbers
        lineNumbersMinChars: 3,
        //
        fontSize: 16,
        scrollBeyondLastLine: false,
        // redraw layout changes
        automaticLayout: true,
      }}
      // includes syntax-highlight, intellisense ect
      language={"javascript"}
      theme={"dark"}
      height={"500px"}
    />
  );
};

export default CodeEditor;
