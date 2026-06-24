"use client";

import { useRef, useMemo } from "react";
import { forwardRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import with ssr: false is essential for React Quill in Next.js App Router
const ReactQuillWrapper = dynamic(
  async () => {
    if (typeof window !== "undefined") {
      (window as any).Quill = (await import("react-quill-new")).default.Quill;
    }
    const { default: RQ } = await import("react-quill-new");
    const { default: ImageResize } = await import("quill-image-resize-module-react");
    
    RQ.Quill.register("modules/imageResize", ImageResize);
    
    return forwardRef(function ForwardedQuill(props: any, ref: any) {
      return <RQ ref={ref} {...props} />;
    });
  },
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

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
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  }), []);

  return (
    <div 
      data-lenis-prevent="true" 
      style={{ background: "#fff", color: "#000", borderRadius: "4px", height: "70vh", minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <style>{`
        .quill {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .ql-toolbar.ql-snow {
          background: #f8f9fa;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          flex-shrink: 0;
        }
        .ql-container.ql-snow {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .ql-editor {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
      <ReactQuillWrapper
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
