"use client";

import { useMemo } from "react";
import { useEditor } from "./EditorProvider";

const BUILDER_TEMPLATE_API =
  "https://6jnqmj85-3000.inc1.devtunnels.ms/api/builder/template";

type CreateTemplateResponse = {
  message?: string;
  template?: {
    _id?: string;
    title?: string;
    slug?: string;
    description?: string;
    status?: "draft" | "published";
    lastSavedAt?: string | null;
    draftContent?: {
      widgets?: unknown[];
    } | null;
    publishedContent?: {
      widgets?: unknown[];
    } | null;
  };
  urls?: {
    previewPath?: string;
    livePath?: string;
  } | null;
};

export default function EditorToolbar() {
  const { dispatch, state } = useEditor();
  const { templateForm, saveState, saveMessage, template, templateUrls } = state;

  const previewUrl = useMemo(() => {
    if (!templateUrls?.previewPath) return "";
    return `https://6jnqmj85-3000.inc1.devtunnels.ms${templateUrls.previewPath}`;
  }, [templateUrls?.previewPath]);

  const liveUrl = useMemo(() => {
    if (!templateUrls?.livePath) return "";
    return `https://6jnqmj85-3000.inc1.devtunnels.ms${templateUrls.livePath}`;
  }, [templateUrls?.livePath]);

  async function handleCreateTemplate() {
    const title = templateForm.title.trim();
    const slug = templateForm.slug.trim();
    const description = templateForm.description.trim();

    if (!title) {
      dispatch({
        type: "SAVE_TEMPLATE_ERROR",
        message: "Template title is required.",
      });
      return;
    }

    if (!slug) {
      dispatch({
        type: "SAVE_TEMPLATE_ERROR",
        message: "Template slug is required.",
      });
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("cms_token") : null;

    if (!token) {
      dispatch({
        type: "SAVE_TEMPLATE_ERROR",
        message: "cms_token not found. Please log in again before creating a template.",
      });
      return;
    }

    dispatch({ type: "SAVE_TEMPLATE_START" });

    try {
      const response = await fetch(BUILDER_TEMPLATE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          content: {
            widgets: state.present.widgets,
          },
        }),
      });

      let result: CreateTemplateResponse | null = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to create template.");
      }

      if (!result?.template) {
        throw new Error("Template response was missing template data.");
      }

      dispatch({
        type: "SAVE_TEMPLATE_SUCCESS",
        payload: {
          message: result?.message || "Builder template created",
          template: result?.template,
          urls: result?.urls || null,
        },
      });
    } catch (error) {
      dispatch({
        type: "SAVE_TEMPLATE_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the template.",
      });
    }
  }

  return (
    <div className="border-b bg-white p-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div className="grid flex-1 gap-2 md:grid-cols-3">
          <input
            type="text"
            placeholder="Template title"
            value={templateForm.title}
            onChange={(event) =>
              dispatch({
                type: "SET_TEMPLATE_FIELD",
                field: "title",
                value: event.target.value,
              })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="template-slug"
            value={templateForm.slug}
            onChange={(event) =>
              dispatch({
                type: "SET_TEMPLATE_FIELD",
                field: "slug",
                value: event.target.value,
              })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Template description"
            value={templateForm.description}
            onChange={(event) =>
              dispatch({
                type: "SET_TEMPLATE_FIELD",
                field: "description",
                value: event.target.value,
              })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => dispatch({ type: "UNDO" })}
            type="button"
          >
            Undo
          </button>
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => dispatch({ type: "REDO" })}
            type="button"
          >
            Redo
          </button>
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => dispatch({ type: "PREVIEW" })}
            type="button"
          >
            Preview
          </button>
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleCreateTemplate}
            type="button"
            disabled={saveState === "saving"}
          >
            {saveState === "saving" ? "Creating..." : "Create Template"}
          </button>
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => dispatch({ type: "PUBLISH" })}
            type="button"
          >
            Publish
          </button>

          {state.mode === "preview" && (
            <button
              className="rounded-md border px-3 py-2 text-sm"
              onClick={() => dispatch({ type: "EDIT" })}
              type="button"
            >
              Back to Edit
            </button>
          )}
        </div>
      </div>

      {(saveMessage || template?._id || templateUrls?.previewPath || templateUrls?.livePath) && (
        <div className="mt-3 flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 md:flex-row md:flex-wrap md:items-center md:gap-4">
          {saveMessage && (
            <span
              className={
                saveState === "error" ? "text-red-600" : "text-green-700"
              }
            >
              {saveMessage}
            </span>
          )}

          {template?._id && <span>Template ID: {template._id}</span>}
          {template?.status && <span>Status: {template.status}</span>}
          {template?.lastSavedAt && (
            <span>
              Last saved: {new Date(template.lastSavedAt).toLocaleString()}
            </span>
          )}
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Preview URL
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Live URL
            </a>
          )}
        </div>
      )}
    </div>
  );
}
