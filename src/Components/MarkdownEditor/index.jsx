import { useState } from "react";
import { marked } from "marked";
import "./styles.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleOnChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    return { __html: marked.parse(markdown) };
  };

  return (
    <div className="editor-container">
      <div className="editor-section">
        <h2>Markdown Input</h2>
        <textarea
          className="markdown-input"
          placeholder="Write Markdown here..."
          value={markdown}
          onChange={handleOnChange}
        />
      </div>

      <div className="preview-section">
        <h2>Live Preview</h2>
        <div
          className="markdown-preview"
          role="region"
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
