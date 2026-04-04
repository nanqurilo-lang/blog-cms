"use client";

import { useEditor } from "./EditorProvider";

const buttonClass = "btn inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition";

export default function WidgetList({ addWidget }: any) {
  const { state } = useEditor();
  const isPreview = state.mode === "preview";

  return (
    <div
      className={`w-64 border-r p-4 space-y-2 ${
        isPreview ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h3 className="mb-2 font-bold">Widgets</h3>

      <button onClick={() => addWidget("button")} className={buttonClass}>
        Button
      </button>

      <button onClick={() => addWidget("text")} className={buttonClass}>
        Text
      </button>

      <button onClick={() => addWidget("heading")} className={buttonClass}>
        Heading
      </button>

      <button onClick={() => addWidget("image")} className={buttonClass}>
        Image
      </button>

      <button onClick={() => addWidget("paragraph")} className={buttonClass}>
        Paragraph
      </button>

      <button onClick={() => addWidget("separator")} className={buttonClass}>
        Separator
      </button>

      <button onClick={() => addWidget("hero")} className={buttonClass}>
        Hero Section
      </button>

      <button onClick={() => addWidget("testimonial")} className={buttonClass}>
        Testimonial
      </button>

      <button onClick={() => addWidget("video")} className={buttonClass}>
      ▶️  Video
      </button>
    </div>
  );
}
