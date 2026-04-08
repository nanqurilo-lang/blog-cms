"use client";

import React, { createContext, useContext, useReducer } from "react";

type WidgetData = {
  id?: string;
  type?: string;
  general?: Record<string, unknown>;
  style?: Record<string, unknown>;
  [key: string]: unknown;
};

type EditorDocument = {
  widgets: WidgetData[];
  [key: string]: unknown;
};

type TemplateForm = {
  title: string;
  slug: string;
  description: string;
  slugTouched: boolean;
};

type BuilderTemplate = {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  status?: "draft" | "published";
  draftContent?: {
    widgets?: WidgetData[];
  } | null;
  publishedContent?: {
    widgets?: WidgetData[];
  } | null;
  lastSavedAt?: string | null;
  publishedAt?: string | null;
  [key: string]: unknown;
};

type TemplateUrls = {
  previewPath?: string;
  livePath?: string;
};

type EditorState = {
  past: EditorDocument[];
  present: EditorDocument;
  future: EditorDocument[];
  mode: "edit" | "preview";
  status: "draft" | "published";
  templateForm: TemplateForm;
  saveState: "idle" | "saving" | "success" | "error";
  saveMessage: string;
  template: BuilderTemplate | null;
  templateUrls: TemplateUrls | null;
};

const initialState: EditorState = {
  past: [],
  present: { widgets: [] },
  future: [],
  mode: "edit",
  status: "draft",
  templateForm: {
    title: "",
    slug: "",
    description: "",
    slugTouched: false,
  },
  saveState: "idle",
  saveMessage: "",
  template: null,
  templateUrls: null,
};

type Action =
  | { type: "UPDATE"; payload: EditorDocument }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "PREVIEW" }
  | { type: "EDIT" }
  | { type: "SAVE_DRAFT" }
  | { type: "PUBLISH" }
  | { type: "SET_TEMPLATE_FIELD"; field: keyof TemplateForm; value: string | boolean }
  | { type: "SAVE_TEMPLATE_START" }
  | {
      type: "SAVE_TEMPLATE_SUCCESS";
      payload: {
        message: string;
        template: BuilderTemplate;
        urls?: TemplateUrls | null;
      };
    }
  | { type: "SAVE_TEMPLATE_ERROR"; message: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

    case "SET_TEMPLATE_FIELD": {
      const nextForm = {
        ...state.templateForm,
        [action.field]: action.value,
      } as TemplateForm;

      if (action.field === "title") {
        const nextTitle = String(action.value);
        const currentAutoSlug = slugify(state.templateForm.title);

        if (
          !state.templateForm.slugTouched ||
          state.templateForm.slug === "" ||
          state.templateForm.slug === currentAutoSlug
        ) {
          nextForm.slug = slugify(nextTitle);
          nextForm.slugTouched = false;
        }
      }

      if (action.field === "slug") {
        nextForm.slugTouched = true;
      }

      return {
        ...state,
        templateForm: nextForm,
      };
    }

    case "SAVE_TEMPLATE_START":
      return {
        ...state,
        saveState: "saving",
        saveMessage: "",
      };

    case "SAVE_TEMPLATE_SUCCESS": {
      const template = action.payload.template;
      const nextWidgets =
        template.draftContent?.widgets ||
        template.publishedContent?.widgets ||
        state.present.widgets;

      localStorage.setItem("draft", JSON.stringify({ widgets: nextWidgets }));

      return {
        ...state,
        present: { widgets: nextWidgets },
        status: template.status || "draft",
        saveState: "success",
        saveMessage: action.payload.message,
        template,
        templateUrls: action.payload.urls || null,
        templateForm: {
          title: template.title || state.templateForm.title,
          slug: template.slug || state.templateForm.slug,
          description: template.description || state.templateForm.description,
          slugTouched: true,
        },
      };
    }

    case "SAVE_TEMPLATE_ERROR":
      return {
        ...state,
        saveState: "error",
        saveMessage: action.message,
      };

    default:
      return state;
  }
}

type EditorContextValue = {
  state: EditorState;
  dispatch: React.Dispatch<Action>;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }

  return context;
};
