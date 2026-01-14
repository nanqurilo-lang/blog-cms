
// "use client";

// import { useState } from "react";

// export default function SettingsPanel({ widget, updateWidget }: any) {
//   const [tab, setTab] = useState<"general" | "style">("general");

//   if (!widget) {
//     return (
//       <div className="w-80 border-l p-4 text-gray-500">
//         Select a widget
//       </div>
//     );
//   }

//   const g = widget.general || {};
//   const s = widget.style || {};

//   const isButton = widget.type === "button";
//   const isText = widget.type === "text";
//   const isImage = widget.type === "image";
//   const isParagraph = widget.type === "paragraph";
//   const isSeparator = widget.type === "separator";

//   return (
//     <div className="w-80 border-l p-4 text-sm overflow-y-auto">
//       {/* Tabs */}
//       <div className="flex mb-4">
//         <button
//           className={`flex-1 p-2 ${
//             tab === "general" ? "font-bold border-b-2" : ""
//           }`}
//           onClick={() => setTab("general")}
//         >
//           General
//         </button>
//         <button
//           className={`flex-1 p-2 ${
//             tab === "style" ? "font-bold border-b-2" : ""
//           }`}
//           onClick={() => setTab("style")}
//         >
//           Style
//         </button>
//       </div>

//       {/* ================= GENERAL TAB ================= */}
//       {tab === "general" && (
//         <div className="space-y-3">
//           {/* TEXT */}
//           {isText && (
//             <>
//               <label>Text</label>
//               <textarea
//                 className="w-full border p-2"
//                 placeholder="Write your text..."
//                 value={g.text || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "text", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* PARAGRAPH */}
//           {isParagraph && (
//             <>
//               <label>Paragraph Content</label>
//               <textarea
//                 className="w-full border p-2"
//                 rows={6}
//                 placeholder="Write paragraph content..."
//                 value={g.text || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "text", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* BUTTON */}
//           {isButton && (
//             <>
//               <input
//                 placeholder="Button Text"
//                 value={g.text || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "text", e.target.value)
//                 }
//               />

//               <input
//                 placeholder="Link"
//                 value={g.link || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "link", e.target.value)
//                 }
//               />

//               <select
//                 value={g.linkTarget || "_self"}
//                 onChange={(e) =>
//                   updateWidget("general", "linkTarget", e.target.value)
//                 }
//               >
//                 <option value="_self">Same Window</option>
//                 <option value="_blank">New Window</option>
//               </select>

//               <input
//                 placeholder="Button ID"
//                 value={g.buttonId || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "buttonId", e.target.value)
//                 }
//               />

//               {/* ICON */}
//               <select
//                 value={g.icon || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "icon", e.target.value)
//                 }
//               >
//                 <option value="">No Icon</option>
//                 <option value="arrow">Arrow</option>
//                 <option value="check">Check</option>
//               </select>

//               <select
//                 value={g.iconPosition || "left"}
//                 onChange={(e) =>
//                   updateWidget("general", "iconPosition", e.target.value)
//                 }
//               >
//                 <option value="left">Icon Left</option>
//                 <option value="right">Icon Right</option>
//               </select>

//               <input
//                 type="number"
//                 placeholder="Icon Spacing"
//                 value={g.iconSpacing || 6}
//                 onChange={(e) =>
//                   updateWidget(
//                     "general",
//                     "iconSpacing",
//                     Number(e.target.value)
//                   )
//                 }
//               />
//             </>
//           )}

//           {/* IMAGE */}
//           {isImage && (
//             <>
//               <input
//                 placeholder="Image URL"
//                 value={g.src || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "src", e.target.value)
//                 }
//               />

//               <input
//                 placeholder="Alt Text"
//                 value={g.alt || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "alt", e.target.value)
//                 }
//               />

//               <input
//                 placeholder="Caption"
//                 value={g.caption || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "caption", e.target.value)
//                 }
//               />

//               <input
//                 placeholder="Link (optional)"
//                 value={g.link || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "link", e.target.value)
//                 }
//               />

//               <select
//                 value={g.linkTarget || "_self"}
//                 onChange={(e) =>
//                   updateWidget("general", "linkTarget", e.target.value)
//                 }
//               >
//                 <option value="_self">Same Window</option>
//                 <option value="_blank">New Window</option>
//               </select>

//               <input
//                 placeholder="Custom Width (300px / 50%)"
//                 value={g.width || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "width", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* SEPARATOR */}
//           {isSeparator && (
//             <>
//               <select
//                 value={g.type || "solid"}
//                 onChange={(e) =>
//                   updateWidget("general", "type", e.target.value)
//                 }
//               >
//                 <option value="solid">Solid</option>
//                 <option value="dashed">Dashed</option>
//                 <option value="dotted">Dotted</option>
//               </select>

//               <input
//                 placeholder="Thickness (2px)"
//                 value={g.thickness || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "thickness", e.target.value)
//                 }
//               />

//               <input
//                 placeholder="Width (100% / 200px)"
//                 value={g.width || ""}
//                 onChange={(e) =>
//                   updateWidget("general", "width", e.target.value)
//                 }
//               />
//             </>
//           )}
//         </div>
//       )}

//       {/* ================= STYLE TAB ================= */}
//       {tab === "style" && (
//         <div className="space-y-3">
//           {/* Alignment */}
//           <select
//             value={s.alignment || "center"}
//             onChange={(e) =>
//               updateWidget("style", "alignment", e.target.value)
//             }
//           >
//             <option value="left">Left</option>
//             <option value="center">Center</option>
//             <option value="right">Right</option>
//             {isParagraph && <option value="justify">Justify</option>}
//           </select>

//           {/* Typography */}
//           {(isText || isButton || isParagraph) && (
//             <>
//               <input
//                 placeholder="Font Size (16px)"
//                 value={s.typography?.fontSize || ""}
//                 onChange={(e) =>
//                   updateWidget("style", "typography", {
//                     ...s.typography,
//                     fontSize: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 placeholder="Font Weight (400, 600)"
//                 value={s.typography?.fontWeight || ""}
//                 onChange={(e) =>
//                   updateWidget("style", "typography", {
//                     ...s.typography,
//                     fontWeight: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 placeholder="Line Height (1.6)"
//                 value={s.typography?.lineHeight || ""}
//                 onChange={(e) =>
//                   updateWidget("style", "typography", {
//                     ...s.typography,
//                     lineHeight: e.target.value,
//                   })
//                 }
//               />
//             </>
//           )}

//           {/* Text Color */}
//           {(isText || isButton || isParagraph) && (
//             <>
//               <label>Text Color</label>
//               <input
//                 type="color"
//                 value={s.textColor || "#000000"}
//                 onChange={(e) =>
//                   updateWidget("style", "textColor", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* Separator Color */}
//           {isSeparator && (
//             <>
//               <label>Color</label>
//               <input
//                 type="color"
//                 value={s.color || "#e5e7eb"}
//                 onChange={(e) =>
//                   updateWidget("style", "color", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* Background */}
//           {!isSeparator && (
//             <>
//               <label>Background</label>
//               <input
//                 type="color"
//                 value={s.background || "#ffffff"}
//                 onChange={(e) =>
//                   updateWidget("style", "background", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* Opacity (Separator) */}
//           {isSeparator && (
//             <input
//               type="number"
//               min="0"
//               max="1"
//               step="0.1"
//               placeholder="Opacity (0.5)"
//               value={s.opacity ?? ""}
//               onChange={(e) =>
//                 updateWidget("style", "opacity", Number(e.target.value))
//               }
//             />
//           )}

//           {/* Border (Button / Image / Paragraph / Separator) */}
//           {(isButton || isImage || isParagraph || isSeparator) && (
//             <>
//               <input
//                 placeholder="Border Radius (8px)"
//                 value={s.radius || ""}
//                 onChange={(e) =>
//                   updateWidget("style", "radius", e.target.value)
//                 }
//               />
//             </>
//           )}

//           {/* Box Shadow (Image only) */}
//           {isImage && (
//             <input
//               placeholder="Box Shadow (CSS)"
//               value={s.boxShadow || ""}
//               onChange={(e) =>
//                 updateWidget("style", "boxShadow", e.target.value)
//               }
//             />
//           )}

//           {/* Spacing */}
//           <input
//             placeholder="Padding (12px 20px)"
//             value={s.padding || ""}
//             onChange={(e) =>
//               updateWidget("style", "padding", e.target.value)
//             }
//           />

//           {(isParagraph || isSeparator) && (
//             <input
//               placeholder="Margin (10px 0)"
//               value={s.margin || ""}
//               onChange={(e) =>
//                 updateWidget("style", "margin", e.target.value)
//               }
//             />
//           )}
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
  const isImage = widget.type === "image";
  const isParagraph = widget.type === "paragraph";
  const isSeparator = widget.type === "separator";
  const isHero = widget.type === "hero";

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

          {/* PARAGRAPH */}
          {isParagraph && (
            <>
              <label>Paragraph Content</label>
              <textarea
                className="w-full border p-2"
                rows={6}
                placeholder="Write paragraph content..."
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
                placeholder="Link"
                value={g.link || ""}
                onChange={(e) =>
                  updateWidget("general", "link", e.target.value)
                }
              />
            </>
          )}

          {/* SEPARATOR */}
          {isSeparator && (
            <>
              <select
                value={g.type || "solid"}
                onChange={(e) =>
                  updateWidget("general", "type", e.target.value)
                }
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>

              <input
                placeholder="Thickness (2px)"
                value={g.thickness || ""}
                onChange={(e) =>
                  updateWidget("general", "thickness", e.target.value)
                }
              />

              <input
                placeholder="Width (100%)"
                value={g.width || ""}
                onChange={(e) =>
                  updateWidget("general", "width", e.target.value)
                }
              />
            </>
          )}

          {/* HERO */}
          {isHero && (
            <>
              <input
                placeholder="Title"
                value={g.title || ""}
                onChange={(e) =>
                  updateWidget("general", "title", e.target.value)
                }
              />

              <input
                placeholder="Subtitle"
                value={g.subtitle || ""}
                onChange={(e) =>
                  updateWidget("general", "subtitle", e.target.value)
                }
              />

              <textarea
                placeholder="Description"
                value={g.description || ""}
                onChange={(e) =>
                  updateWidget("general", "description", e.target.value)
                }
              />

              <select
                value={g.bgType || "color"}
                onChange={(e) =>
                  updateWidget("general", "bgType", e.target.value)
                }
              >
                <option value="color">Background Color</option>
                <option value="image">Background Image</option>
                <option value="gradient">Gradient</option>
              </select>

              {g.bgType === "color" && (
                <input
                  type="color"
                  value={g.bgColor || "#0f172a"}
                  onChange={(e) =>
                    updateWidget("general", "bgColor", e.target.value)
                  }
                />
              )}

              {g.bgType === "image" && (
                <input
                  placeholder="Background Image URL"
                  value={g.bgImage || ""}
                  onChange={(e) =>
                    updateWidget("general", "bgImage", e.target.value)
                  }
                />
              )}

              {g.bgType === "gradient" && (
                <input
                  placeholder="CSS Gradient"
                  value={g.bgGradient || ""}
                  onChange={(e) =>
                    updateWidget("general", "bgGradient", e.target.value)
                  }
                />
              )}

              <input
                placeholder="Button Text"
                value={g.btnText || ""}
                onChange={(e) =>
                  updateWidget("general", "btnText", e.target.value)
                }
              />

              <input
                placeholder="Button Link"
                value={g.btnLink || ""}
                onChange={(e) =>
                  updateWidget("general", "btnLink", e.target.value)
                }
              />

              <select
                value={g.align || "center"}
                onChange={(e) =>
                  updateWidget("general", "align", e.target.value)
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </>
          )}
        </div>
      )}

      {/* ================= STYLE TAB ================= */}
      {tab === "style" && (
        <div className="space-y-3">
          {/* HERO STYLES */}
          {isHero && (
            <>
              <input
                placeholder="Height (70vh)"
                value={s.height || ""}
                onChange={(e) =>
                  updateWidget("style", "height", e.target.value)
                }
              />

              <input
                placeholder="Padding (80px 20px)"
                value={s.padding || ""}
                onChange={(e) =>
                  updateWidget("style", "padding", e.target.value)
                }
              />

              <label>Overlay Color</label>
              <input
                type="color"
                value={s.overlayColor || ""}
                onChange={(e) =>
                  updateWidget("style", "overlayColor", e.target.value)
                }
              />

              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                placeholder="Overlay Opacity (0.5)"
                value={s.overlayOpacity ?? ""}
                onChange={(e) =>
                  updateWidget(
                    "style",
                    "overlayOpacity",
                    Number(e.target.value)
                  )
                }
              />

              <input
                placeholder="Title Font Size (48px)"
                value={s.title?.fontSize || ""}
                onChange={(e) =>
                  updateWidget("style", "title", {
                    ...s.title,
                    fontSize: e.target.value,
                  })
                }
              />

              <input
                placeholder="Subtitle Font Size (22px)"
                value={s.subtitle?.fontSize || ""}
                onChange={(e) =>
                  updateWidget("style", "subtitle", {
                    ...s.subtitle,
                    fontSize: e.target.value,
                  })
                }
              />

              <input
                placeholder="Button Background Color"
                value={s.button?.bg || ""}
                onChange={(e) =>
                  updateWidget("style", "button", {
                    ...s.button,
                    bg: e.target.value,
                  })
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
