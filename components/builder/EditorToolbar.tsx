"use client";

import { useEditor } from "./EditorProvider";

export default function EditorToolbar() {
  const { dispatch, state } = useEditor();

  return (
    <div className="flex gap-2 border-b p-3 bg-white">
      <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
      <button onClick={() => dispatch({ type: "REDO" })}>Redo</button>

      <button onClick={() => dispatch({ type: "PREVIEW" })}>
        Preview
      </button>

      <button onClick={() => dispatch({ type: "SAVE_DRAFT" })}>
        Save as Draft
      </button>

      <button onClick={() => dispatch({ type: "PUBLISH" })}>
        Publish
      </button>

      {state.mode === "preview" && (
        <button onClick={() => dispatch({ type: "EDIT" })}>
          Back to Edit
        </button>
      )}
    </div>
  );
}
