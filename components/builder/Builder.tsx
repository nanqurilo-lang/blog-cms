"use client";

import { useState } from "react";
import WidgetList from "./WidgetList";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import EditorToolbar from "./EditorToolbar";
import { EditorProvider, useEditor } from "./EditorProvider";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function createWidget(type: string) {
  const id = crypto.randomUUID();

  if (type === "button") {
    return {
      id,
      type,
      general: {
        text: "Read More",
        link: "#",
        linkTarget: "_self",
        buttonId: "",
        ariaLabel: "",
        noFollow: false,
        icon: "arrow-right",
        iconPosition: "right",
        iconSpacing: 8,
        iconSize: 18,
        size: "md",
        widthMode: "auto",
      },
      style: {
        alignment: "left",
        width: "",
        minWidth: "",
        padding: "14px 28px",
        margin: "0px",
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        textColor: "#ffffff",
        textShadow: "none",
        boxShadow: "0 10px 25px rgba(37, 99, 235, 0.22)",
        transitionDuration: "0.25s",
        typography: {
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "1",
          letterSpacing: "0px",
          textTransform: "none",
          fontFamily: "inherit",
        },
        border: {
          width: "1px",
          style: "solid",
          color: "#2563eb",
          radius: "999px",
        },
        hover: {
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
          textColor: "#ffffff",
          borderColor: "#1d4ed8",
          boxShadow: "0 16px 35px rgba(29, 78, 216, 0.28)",
          translateY: "-2px",
        },
      },
    };
  }

  if (type === "text") {
    return {
      id,
      type,
      general: {
        text: "Start writing your story with rich text styling.",
        htmlTag: "div",
        variant: "default",
        link: "",
        linkTarget: "_self",
        ariaLabel: "",
        noFollow: false,
      },
      style: {
        alignment: "left",
        width: "",
        maxWidth: "",
        minHeight: "",
        padding: "0px",
        margin: "0px",
        background: "transparent",
        textColor: "#111827",
        opacity: 1,
        textShadow: "none",
        boxShadow: "none",
        transitionDuration: "0.25s",
        typography: {
          fontSize: "17px",
          fontWeight: "400",
          lineHeight: "1.7",
          letterSpacing: "0px",
          textTransform: "none",
          textDecoration: "none",
          fontStyle: "normal",
          fontFamily: "inherit",
        },
        border: {
          width: "0px",
          style: "solid",
          color: "#e5e7eb",
          radius: "0px",
        },
      },
    };
  }

  if (type === "image") {
    return {
      id,
      type,
      general: {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        alt: "Workspace setup",
        caption: "Showcase your visuals with polished image controls.",
        link: "",
        linkTarget: "_self",
        ariaLabel: "",
        noFollow: false,
        loading: "lazy",
        captionPosition: "below",
      },
      style: {
        alignment: "left",
        width: "100%",
        maxWidth: "720px",
        height: "auto",
        minHeight: "",
        aspectRatio: "16 / 9",
        objectFit: "cover",
        objectPosition: "center center",
        padding: "0px",
        margin: "0px",
        background: "transparent",
        opacity: 1,
        filter: "none",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
        transitionDuration: "0.3s",
        border: {
          width: "0px",
          style: "solid",
          color: "#e5e7eb",
          radius: "24px",
        },
        overlay: {
          color: "rgba(15, 23, 42, 0)",
          opacity: 0,
        },
        caption: {
          color: "#6b7280",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "1.6",
          align: "left",
          spacing: "12px",
          background: "transparent",
          padding: "0px",
        },
        hover: {
          opacity: 1,
          scale: "1.02",
          rotate: "0deg",
          filter: "none",
          overlayOpacity: 0,
          boxShadow: "0 24px 50px rgba(15, 23, 42, 0.18)",
        },
      },
    };
  }

  if (type === "paragraph") {
    return {
      id,
      type,
      general: {
        text: "Craft polished long-form content with comfortable reading rhythm and clear visual hierarchy.",
        htmlTag: "p",
        variant: "body",
        link: "",
        linkTarget: "_self",
        ariaLabel: "",
        noFollow: false,
      },
      style: {
        alignment: "left",
        width: "100%",
        maxWidth: "760px",
        minHeight: "",
        padding: "0px",
        margin: "0px 0px 18px 0px",
        background: "transparent",
        textColor: "#374151",
        opacity: 1,
        textShadow: "none",
        boxShadow: "none",
        transitionDuration: "0.25s",
        typography: {
          fontSize: "17px",
          fontWeight: "400",
          lineHeight: "1.85",
          letterSpacing: "0px",
          textTransform: "none",
          textDecoration: "none",
          fontStyle: "normal",
          fontFamily: "inherit",
        },
        border: {
          width: "0px",
          style: "solid",
          color: "#e5e7eb",
          radius: "0px",
        },
      },
    };
  }

  if (type === "separator") {
    return {
      id,
      type,
      general: {
        type: "solid",
        thickness: "2px",
        width: "100%",
        label: "",
        labelPosition: "center",
      },
      style: {
        alignment: "center",
        color: "#d1d5db",
        opacity: 1,
        radius: "999px",
        padding: "14px 0px",
        margin: "0px",
        boxShadow: "none",
        label: {
          color: "#6b7280",
          background: "#ffffff",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          padding: "0px 12px",
        },
      },
    };
  }

  return {
    id,
    type,
    general: {},
    style: {},
  };
}

function BuilderContent() {
  const { state, dispatch } = useEditor();
  const widgets = state.present.widgets;

  const [activeId, setActiveId] = useState<string | null>(null);

  function addWidget(type: string) {
    const newWidget = createWidget(type);

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: [...widgets, newWidget],
      },
    });

    setActiveId(newWidget.id);
  }

  function updateWidget(section: string, key: string, value: any) {
    if (!activeId) return;

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: widgets.map((w: any) =>
          w.id === activeId
            ? {
                ...w,
                [section]: {
                  ...w[section],
                  [key]: value,
                },
              }
            : w
        ),
      },
    });
  }

  function onDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((i: any) => i.id === active.id);
    const newIndex = widgets.findIndex((i: any) => i.id === over.id);

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: arrayMove(widgets, oldIndex, newIndex),
      },
    });
  }

  return (
    <>
      <EditorToolbar />

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-56px)]">
          <WidgetList addWidget={addWidget} />

          <Canvas
            widgets={widgets}
            activeId={activeId}
            setActiveId={setActiveId}
          />

          <SettingsPanel
            widget={widgets.find((w: any) => w.id === activeId)}
            updateWidget={updateWidget}
          />
        </div>
      </DndContext>
    </>
  );
}

export default function Builder() {
  return (
    <EditorProvider>
      <BuilderContent />
    </EditorProvider>
  );
}
