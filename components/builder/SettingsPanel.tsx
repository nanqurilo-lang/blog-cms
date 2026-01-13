"use client";

import { useState } from "react";

export default function SettingsPanel({ widget, updateWidget }: any) {
  const [tab, setTab] = useState<"general" | "style">("general");

  if (!widget) {
    return (
      <div className="w-80 border-l p-4 text-gray-500">
        Select a widget
      </div>
    );
  }

  const g = widget.general || {};
  const s = widget.style || {};

  const isButton = widget.type === "button";
  const isText = widget.type === "text";
  const isImage = widget.type === "image";

  return (
    <div className="w-80 border-l p-4 text-sm overflow-y-auto">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`flex-1 p-2 ${
            tab === "general" ? "font-bold border-b-2" : ""
          }`}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          className={`flex-1 p-2 ${
            tab === "style" ? "font-bold border-b-2" : ""
          }`}
          onClick={() => setTab("style")}
        >
          Style
        </button>
      </div>

      {/* ================= GENERAL TAB ================= */}
      {tab === "general" && (
        <div className="space-y-3">
          {/* TEXT */}
          {isText && (
            <>
              <label>Text</label>
              <textarea
                className="w-full border p-2"
                placeholder="Write your text..."
                value={g.text || ""}
                onChange={(e) =>
                  updateWidget("general", "text", e.target.value)
                }
              />
            </>
          )}

          {/* BUTTON */}
          {isButton && (
            <>
              <input
                placeholder="Button Text"
                value={g.text || ""}
                onChange={(e) =>
                  updateWidget("general", "text", e.target.value)
                }
              />

              <input
                placeholder="Link"
                value={g.link || ""}
                onChange={(e) =>
                  updateWidget("general", "link", e.target.value)
                }
              />

              <select
                value={g.linkTarget || "_self"}
                onChange={(e) =>
                  updateWidget("general", "linkTarget", e.target.value)
                }
              >
                <option value="_self">Same Window</option>
                <option value="_blank">New Window</option>
              </select>

              <input
                placeholder="Button ID"
                value={g.buttonId || ""}
                onChange={(e) =>
                  updateWidget("general", "buttonId", e.target.value)
                }
              />

              {/* ICON */}
              <select
                value={g.icon || ""}
                onChange={(e) =>
                  updateWidget("general", "icon", e.target.value)
                }
              >
                <option value="">No Icon</option>
                <option value="arrow">Arrow</option>
                <option value="check">Check</option>
              </select>

              <select
                value={g.iconPosition || "left"}
                onChange={(e) =>
                  updateWidget("general", "iconPosition", e.target.value)
                }
              >
                <option value="left">Icon Left</option>
                <option value="right">Icon Right</option>
              </select>

              <input
                type="number"
                placeholder="Icon Spacing"
                value={g.iconSpacing || 6}
                onChange={(e) =>
                  updateWidget(
                    "general",
                    "iconSpacing",
                    Number(e.target.value)
                  )
                }
              />
            </>
          )}

          {/* IMAGE */}
          {isImage && (
            <>
              <input
                placeholder="Image URL"
                value={g.src || ""}
                onChange={(e) =>
                  updateWidget("general", "src", e.target.value)
                }
              />

              <input
                placeholder="Alt Text"
                value={g.alt || ""}
                onChange={(e) =>
                  updateWidget("general", "alt", e.target.value)
                }
              />

              <input
                placeholder="Caption"
                value={g.caption || ""}
                onChange={(e) =>
                  updateWidget("general", "caption", e.target.value)
                }
              />

              <input
                placeholder="Link (optional)"
                value={g.link || ""}
                onChange={(e) =>
                  updateWidget("general", "link", e.target.value)
                }
              />

              <select
                value={g.linkTarget || "_self"}
                onChange={(e) =>
                  updateWidget("general", "linkTarget", e.target.value)
                }
              >
                <option value="_self">Same Window</option>
                <option value="_blank">New Window</option>
              </select>

              <input
                placeholder="Custom Width (300px / 50%)"
                value={g.width || ""}
                onChange={(e) =>
                  updateWidget("general", "width", e.target.value)
                }
              />
            </>
          )}
        </div>
      )}

      {/* ================= STYLE TAB ================= */}
      {tab === "style" && (
        <div className="space-y-3">
          {/* Alignment */}
          <select
            value={s.alignment || "left"}
            onChange={(e) =>
              updateWidget("style", "alignment", e.target.value)
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          {/* Typography (Text + Button) */}
          {(isText || isButton) && (
            <>
              <input
                placeholder="Font Size (16px)"
                value={s.typography?.fontSize || ""}
                onChange={(e) =>
                  updateWidget("style", "typography", {
                    ...s.typography,
                    fontSize: e.target.value,
                  })
                }
              />

              <input
                placeholder="Font Weight (400, 600)"
                value={s.typography?.fontWeight || ""}
                onChange={(e) =>
                  updateWidget("style", "typography", {
                    ...s.typography,
                    fontWeight: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* Text Color */}
          {(isText || isButton) && (
            <>
              <label>Text Color</label>
              <input
                type="color"
                value={s.textColor || "#000000"}
                onChange={(e) =>
                  updateWidget("style", "textColor", e.target.value)
                }
              />
            </>
          )}

          {/* Background */}
          <label>Background</label>
          <input
            type="color"
            value={s.background || "#ffffff"}
            onChange={(e) =>
              updateWidget("style", "background", e.target.value)
            }
          />

          {/* Hover (Button + Image) */}
          {(isButton || isImage) && (
            <>
              <label>Hover Effect</label>
              <input
                placeholder="Opacity (0.8)"
                value={s.hover?.opacity || ""}
                onChange={(e) =>
                  updateWidget("style", "hover", {
                    ...s.hover,
                    opacity: Number(e.target.value),
                  })
                }
              />
            </>
          )}

          {/* Border (Button + Image) */}
          {(isButton || isImage) && (
            <>
              <input
                placeholder="Border Width (1px)"
                value={s.border?.width || ""}
                onChange={(e) =>
                  updateWidget("style", "border", {
                    ...s.border,
                    width: e.target.value,
                  })
                }
              />

              <input
                type="color"
                value={s.border?.color || "#000000"}
                onChange={(e) =>
                  updateWidget("style", "border", {
                    ...s.border,
                    color: e.target.value,
                  })
                }
              />

              <input
                placeholder="Border Radius (8px)"
                value={s.border?.radius || ""}
                onChange={(e) =>
                  updateWidget("style", "border", {
                    ...s.border,
                    radius: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* Box Shadow (Image) */}
          {isImage && (
            <input
              placeholder="Box Shadow (CSS)"
              value={s.boxShadow || ""}
              onChange={(e) =>
                updateWidget("style", "boxShadow", e.target.value)
              }
            />
          )}

          {/* Padding */}
          <input
            placeholder="Padding (12px 20px)"
            value={s.padding || ""}
            onChange={(e) =>
              updateWidget("style", "padding", e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
}
