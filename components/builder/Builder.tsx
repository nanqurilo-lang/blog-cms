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

  if (type === "hero") {
    return {
      id,
      type,
      general: {
        title: "Build standout stories with a hero section that feels intentional.",
        subtitle: "Elementor-style hero block",
        description: "Mix striking backgrounds, clear hierarchy, and focused calls to action to open every post with confidence.",
        bgType: "gradient",
        bgColor: "#0f172a",
        bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
        bgGradient: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #38bdf8 100%)",
        btnText: "Explore Story",
        btnLink: "#",
        btnTarget: "_self",
        btnNoFollow: false,
        align: "center",
        verticalAlign: "center",
      },
      style: {
        height: "72vh",
        minHeight: "560px",
        maxWidth: "1200px",
        contentWidth: "720px",
        padding: "96px 32px",
        borderRadius: "32px",
        textColor: "#ffffff",
        bgSize: "cover",
        bgPosition: "center center",
        bgRepeat: "no-repeat",
        boxShadow: "0 28px 70px rgba(15, 23, 42, 0.28)",
        overlayColor: "#020617",
        overlayOpacity: 0.42,
        title: {
          fontSize: "clamp(42px, 7vw, 72px)",
          fontWeight: "800",
          lineHeight: "1.02",
          letterSpacing: "-0.04em",
          marginBottom: "18px",
        },
        subtitle: {
          fontSize: "14px",
          fontWeight: "700",
          lineHeight: "1.2",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          marginBottom: "20px",
          color: "rgba(255,255,255,0.75)",
        },
        text: {
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "1.8",
          marginBottom: "30px",
          color: "rgba(255,255,255,0.9)",
        },
        button: {
          padding: "14px 30px",
          bg: "#ffffff",
          color: "#0f172a",
          radius: "999px",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "transparent",
          boxShadow: "0 18px 35px rgba(15, 23, 42, 0.2)",
        },
      },
    };
  }

  if (type === "heading") {
    return {
      id,
      type,
      general: {
        text: "Build more polished blog sections with clear, editorial-style headings.",
        highlightText: "editorial-style",
        subtitle: "Use strong hierarchy, optional eyebrow text, and highlighted phrases to guide readers through your post.",
        eyebrow: "Section Intro",
        htmlTag: "h2",
        anchorId: "",
      },
      style: {
        alignment: "left",
        width: "100%",
        maxWidth: "900px",
        minHeight: "",
        padding: "0px",
        margin: "0px 0px 28px 0px",
        background: "transparent",
        textColor: "#111827",
        opacity: 1,
        textShadow: "none",
        boxShadow: "none",
        typography: {
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: "800",
          lineHeight: "1.05",
          letterSpacing: "-0.03em",
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
        highlight: {
          color: "#1d4ed8",
          background: "transparent",
          padding: "0px",
          radius: "0px",
        },
        eyebrow: {
          color: "#2563eb",
          fontSize: "13px",
          fontWeight: "700",
          lineHeight: "1.2",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "14px",
        },
        subtitle: {
          color: "#6b7280",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "1.7",
          letterSpacing: "0px",
          marginTop: "16px",
          maxWidth: "720px",
        },
      },
    };
  }

  if (type === "video") {
    return {
      id,
      type,
      general: {
        sourceType: "embed",
        src: "",
        embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Product walkthrough",
        poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
        caption: "Use a polished video block to add interviews, demos, or story-driven media inside your post.",
        showCaption: true,
        controls: true,
        autoplay: false,
        muted: true,
        loop: false,
        playsInline: true,
        preload: "metadata",
        loading: "lazy",
        showPlayIcon: true,
      },
      style: {
        alignment: "left",
        width: "100%",
        maxWidth: "860px",
        minHeight: "",
        padding: "0px",
        margin: "0px",
        background: "transparent",
        frameBackground: "#0f172a",
        opacity: 1,
        filter: "none",
        objectFit: "cover",
        objectPosition: "center center",
        aspectRatio: "16 / 9",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.14)",
        transitionDuration: "0.3s",
        border: {
          width: "0px",
          style: "solid",
          color: "#e5e7eb",
          radius: "28px",
        },
        overlay: {
          color: "rgba(15, 23, 42, 0.15)",
          opacity: 0,
        },
        playIcon: {
          size: "56px",
          iconSize: "22",
          positionX: "20px",
          positionY: "20px",
          background: "rgba(255, 255, 255, 0.16)",
          color: "#ffffff",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.24)",
        },
        caption: {
          color: "#6b7280",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "1.6",
          letterSpacing: "0px",
          align: "left",
          background: "transparent",
          padding: "14px 16px 0px",
        },
        placeholder: {
          color: "#cbd5e1",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        },
        hover: {
          scale: "1",
          boxShadow: "0 28px 70px rgba(15, 23, 42, 0.18)",
        },
      },
    };
  }

  if (type === "testimonial") {
    return {
      id,
      type,
      general: {
        quote: "This builder now feels far more intentional. We can launch polished pages much faster without fighting the layout.",
        name: "Aarav Mehta",
        role: "Product Lead",
        company: "Northstar Studio",
        avatar: "",
        showAvatar: true,
        rating: 5,
        showRating: true,
      },
      style: {
        alignment: "left",
        width: "100%",
        maxWidth: "640px",
        margin: "0px",
        padding: "28px",
        background: "#ffffff",
        textColor: "#111827",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
        border: {
          width: "1px",
          style: "solid",
          color: "#e5e7eb",
          radius: "28px",
        },
        quote: {
          color: "#111827",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "1.8",
          letterSpacing: "0px",
          fontStyle: "normal",
          marginBottom: "22px",
        },
        rating: {
          color: "#f59e0b",
          size: 16,
          marginBottom: "18px",
        },
        author: {
          gap: "14px",
          avatarSize: "56px",
          avatarRadius: "999px",
          avatarBg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          avatarColor: "#1d4ed8",
          avatarTextSize: "18px",
          nameColor: "#111827",
          nameSize: "16px",
          nameWeight: "700",
          nameLineHeight: "1.3",
          metaColor: "#6b7280",
          metaSize: "14px",
          metaWeight: "500",
          metaLineHeight: "1.5",
          metaSpacing: "4px",
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
