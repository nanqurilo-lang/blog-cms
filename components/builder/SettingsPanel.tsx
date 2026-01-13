// "use client";

// import { useState } from "react";

// export default function SettingsPanel({ widget, updateWidget }: any) {
//   const [tab, setTab] = useState<"general" | "style">("general");

//   if (!widget) {
//     return (
//       <div className="w-80 border-l p-4 text-gray-500">Select a widget</div>
//     );
//   }

//   const g = widget.general || {};
//   const s = widget.style || {};
  

//   return (
//     <div className="w-80 border-l p-4 text-sm">
//       {/* Tabs */}
//       <div className="flex mb-4">
//         <button
//           className={`flex-1 ${tab === "general" ? "font-bold" : ""}`}
//           onClick={() => setTab("general")}
//         >
//           General
//         </button>
//         <button
//           className={`flex-1 ${tab === "style" ? "font-bold" : ""}`}
//           onClick={() => setTab("style")}
//         >
//           Style
//         </button>
//       </div>

//       {/* ================= GENERAL TAB ================= */}
//       {tab === "general" && (
//         <div className="space-y-3">
//           <input
//             placeholder="Button Text"
//             value={g.text || ""}
//             onChange={(e) => updateWidget("general", "text", e.target.value)}
//           />

//           <input
//             placeholder="Link"
//             value={g.link || ""}
//             onChange={(e) => updateWidget("general", "link", e.target.value)}
//           />

//           <select
//             value={g.linkTarget || "_self"}
//             onChange={(e) =>
//               updateWidget("general", "linkTarget", e.target.value)
//             }
//           >
//             <option value="_self">Same Window</option>
//             <option value="_blank">New Window</option>
//           </select>

//           <input
//             placeholder="Button ID"
//             value={g.buttonId || ""}
//             onChange={(e) =>
//               updateWidget("general", "buttonId", e.target.value)
//             }
//           />

//           {/* ICON CONTROLS */}
//           <select
//             value={g.icon || ""}
//             onChange={(e) => updateWidget("general", "icon", e.target.value)}
//           >
//             <option value="">No Icon</option>
//             <option value="arrow">Arrow</option>
//             <option value="check">Check</option>
//           </select>

//           <select
//             value={g.iconPosition || "left"}
//             onChange={(e) =>
//               updateWidget("general", "iconPosition", e.target.value)
//             }
//           >
//             <option value="left">Icon Left</option>
//             <option value="right">Icon Right</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Icon Spacing"
//             value={g.iconSpacing || 6}
//             onChange={(e) =>
//               updateWidget("general", "iconSpacing", Number(e.target.value))
//             }
//           />
//         </div>
//       )}

//       {/* ================= STYLE TAB ================= */}
//       {tab === "style" && (
//         <div className="space-y-3">
//           {/* Alignment */}
//           <select
//             value={s.alignment || "left"}
//             onChange={(e) => updateWidget("style", "alignment", e.target.value)}
//           >
//             <option value="left">Left</option>
//             <option value="center">Center</option>
//             <option value="right">Right</option>
//           </select>

//           {/* Typography */}
//           <input
//             placeholder="Font Size (16px)"
//             value={s.typography?.fontSize || ""}
//             onChange={(e) =>
//               updateWidget("style", "typography", {
//                 ...s.typography,
//                 fontSize: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Font Weight (600)"
//             value={s.typography?.fontWeight || ""}
//             onChange={(e) =>
//               updateWidget("style", "typography", {
//                 ...s.typography,
//                 fontWeight: e.target.value,
//               })
//             }
//           />

//           {/* Colors */}
//           <label>Text Color</label>
//           <input
//             type="color"
//             value={s.textColor || "#ffffff"}
//             onChange={(e) => updateWidget("style", "textColor", e.target.value)}
//           />

//           <label>Background</label>
//           <input
//             type="color"
//             value={s.background || "#000000"}
//             onChange={(e) =>
//               updateWidget("style", "background", e.target.value)
//             }
//           />

//           {/* Hover */}
//           <label>Hover Background</label>
//           <input
//             type="color"
//             value={s.hover?.background || "#000000"}
//             onChange={(e) =>
//               updateWidget("style", "hover", {
//                 ...s.hover,
//                 background: e.target.value,
//               })
//             }
//           />

//           <label>Hover Text Color</label>
//           <input
//             type="color"
//             value={s.hover?.textColor || "#ffffff"}
//             onChange={(e) =>
//               updateWidget("style", "hover", {
//                 ...s.hover,
//                 textColor: e.target.value,
//               })
//             }
//           />

//           {/* Border */}
//           <input
//             placeholder="Border Width (1px)"
//             value={s.border?.width || ""}
//             onChange={(e) =>
//               updateWidget("style", "border", {
//                 ...s.border,
//                 width: e.target.value,
//               })
//             }
//           />

//           <input
//             type="color"
//             value={s.border?.color || "#000000"}
//             onChange={(e) =>
//               updateWidget("style", "border", {
//                 ...s.border,
//                 color: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Border Radius (8px)"
//             value={s.border?.radius || ""}
//             onChange={(e) =>
//               updateWidget("style", "border", {
//                 ...s.border,
//                 radius: e.target.value,
//               })
//             }
//           />

//           {/* Padding */}
//           <input
//             placeholder="Padding (12px 20px)"
//             value={s.padding || ""}
//             onChange={(e) => updateWidget("style", "padding", e.target.value)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }




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

  return (
    <div className="w-80 border-l p-4 text-sm overflow-y-auto">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`flex-1 p-2 ${tab === "general" ? "font-bold border-b-2" : ""}`}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          className={`flex-1 p-2 ${tab === "style" ? "font-bold border-b-2" : ""}`}
          onClick={() => setTab("style")}
        >
          Style
        </button>
      </div>

      {/* ================= GENERAL TAB ================= */}
      {tab === "general" && (
        <div className="space-y-3">
          {/* ===== TEXT WIDGET ===== */}
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

          {/* ===== BUTTON WIDGET ===== */}
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

          {/* Typography */}
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

          {/* Text Color */}
          <label>Text Color</label>
          <input
            type="color"
            value={s.textColor || "#000000"}
            onChange={(e) =>
              updateWidget("style", "textColor", e.target.value)
            }
          />

          {/* Background */}
          <label>Background</label>
          <input
            type="color"
            value={s.background || "#ffffff"}
            onChange={(e) =>
              updateWidget("style", "background", e.target.value)
            }
          />

          {/* Hover (for button only) */}
          {isButton && (
            <>
              <label>Hover Background</label>
              <input
                type="color"
                value={s.hover?.background || "#000000"}
                onChange={(e) =>
                  updateWidget("style", "hover", {
                    ...s.hover,
                    background: e.target.value,
                  })
                }
              />

              <label>Hover Text Color</label>
              <input
                type="color"
                value={s.hover?.textColor || "#ffffff"}
                onChange={(e) =>
                  updateWidget("style", "hover", {
                    ...s.hover,
                    textColor: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* Border (for button) */}
          {isButton && (
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
