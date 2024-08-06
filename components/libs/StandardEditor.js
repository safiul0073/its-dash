import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { ModalManager } from "./FileManager/ModalManager";

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const uploadingRef = useRef(false); // To prevent multiple uploads

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: "#toolbar",
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");

      quillRef.current.on("text-change", () => {
        const text = quillRef.current.root.innerHTML;
        if (text !== value) {
          onChange(text);
        }
      });

      return () => {
        quillRef.current = null;
      };
    }
  }, []);
  const [isOpne, setIsOpen] = React.useState(false);
  const imageHandler = () => {
    if (uploadingRef.current) return; // Prevent multiple uploads
    uploadingRef.current = true;

    setIsOpen(true);
  };
  const OnSelectFile = (url) => {
    const range = quillRef.current.getSelection();
    quillRef.current.insertEmbed(range.index, "image", url);
    setIsOpen(false);
    uploadingRef.current = false;
  };
  return (
    <div>
      <div>
        {/* Define the toolbar */}
        <div id="toolbar">
          <select className="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value=""></option>
          </select>
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </div>
        {/* Editor */}
        <div ref={editorRef}></div>
      </div>
      <ModalManager
        open={uploadingRef.current}
        setOpen={setIsOpen}
        OnSelectFile={OnSelectFile}
      />
    </div>
  );
};

export default QuillEditor;
