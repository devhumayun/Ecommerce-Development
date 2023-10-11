import JoditEditor from "jodit-react";
import { useRef } from "react";

const TextEditor = (content, setContent) => {
  const editor = useRef(null)
  return (
    <JoditEditor
      ref={editor}
      value={content}
      onChange={(newContent) => {
        setContent(newContent);
      }}
    />
  );
};

export default TextEditor;
