"use client";

import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import with ssr: false is essential for React Quill in Next.js App Router
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false, loading: () => <p>Loading editor...</p> });

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { url } = await response.json();
          // Insert into editor
          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection();
            editor.insertEmbed(range?.index || 0, "image", url);
            // Apply some default inline styles so it fits well like the other images
            editor.formatText(range?.index || 0, 1, {
              width: "100%",
              style: "aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; margin: 3rem 0; border: 1px solid rgba(255,255,255,0.07);"
            });
          }
        } else {
          alert("Failed to upload image");
        }
      } catch (error) {
        alert("Upload error");
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  return (
    <div style={{ background: "#fff", color: "#000", borderRadius: "4px", overflow: "hidden" }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        style={{ minHeight: "400px" }}
      />
    </div>
  );
}
