"use client";

import React, { createContext, useContext, useReducer } from "react";

type EditorState = {
  past: any[];
  present: any;
  future: any[];
  mode: "edit" | "preview";
  status: "draft" | "published";
};

const initialState: EditorState = {
  past: [],
  present: { widgets: [] },
  future: [],
  mode: "edit",
  status: "draft",
};

type Action =
  | { type: "UPDATE"; payload: any }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "PREVIEW" }
  | { type: "EDIT" }
  | { type: "SAVE_DRAFT" }
  | { type: "PUBLISH" };

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };

    case "UNDO":
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      return {
        ...state,
        past: state.past.slice(0, -1),
        future: [state.present, ...state.future],
        present: previous,
      };

    case "REDO":
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        ...state,
        past: [...state.past, state.present],
        future: state.future.slice(1),
        present: next,
      };

    case "PREVIEW":
      return { ...state, mode: "preview" };

    case "EDIT":
      return { ...state, mode: "edit" };

    case "SAVE_DRAFT":
      localStorage.setItem("draft", JSON.stringify(state.present));
      return { ...state, status: "draft" };

    case "PUBLISH":
      localStorage.setItem("published", JSON.stringify(state.present));
      return { ...state, status: "published" };

    default:
      return state;
  }
}

const EditorContext = createContext<any>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => useContext(EditorContext);
