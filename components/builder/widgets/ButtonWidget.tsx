"use client";

import { useState } from "react";

export default function ButtonWidget({ widget }: any) {
  const [hover, setHover] = useState(false);

  const g = widget.general || {};
  const s = widget.style || {};

  const Icon = () => {
    if (g.icon === "arrow") return <span>→</span>;
    if (g.icon === "check") return <span>✔</span>;
    return null;
  };

  const background = hover ? s.hover?.background || s.background : s.background;

  const textColor = hover ? s.hover?.textColor || s.textColor : s.textColor;

  return (
    <div style={{ textAlign: s.alignment || "left" }}>
      <a
        id={g.buttonId}
        href={g.link || "#"}
        target={g.linkTarget || "_self"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: g.iconSpacing || 6,

          background,
          color: textColor,
          padding: s.padding || "12px 20px",

          fontSize: s.typography?.fontSize || "16px",
          fontWeight: s.typography?.fontWeight || "600",
          fontFamily: s.typography?.fontFamily || "inherit",
          lineHeight: s.typography?.lineHeight || "1.2",
          textShadow: s.textShadow || "none",

          borderRadius: s.border?.radius || "6px",
          border: `${s.border?.width || "1px"} ${s.border?.style || "solid"} ${
            s.border?.color || "#000"
          }`,

          transition: "all 0.25s ease",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {g.icon && g.iconPosition === "left" && <Icon />}
        {g.text || "Button"}
        {g.icon && g.iconPosition === "right" && <Icon />}
      </a>
    </div>
  );
}





// "use client";

// import { useState } from "react";
// import { useEditor } from "../EditorProvider";

// export default function ButtonWidget({ widget }: any) {
//   const { state } = useEditor();
//   const [hover, setHover] = useState(false);

//   const isPreview = state.mode === "preview";

//   const g = widget.general || {};
//   const s = widget.style || {};

//   const Icon = () => {
//     if (g.icon === "arrow") return <span>→</span>;
//     if (g.icon === "check") return <span>✔</span>;
//     return null;
//   };

//   const background = hover
//     ? s.hover?.background || s.background
//     : s.background;

//   const textColor = hover
//     ? s.hover?.textColor || s.textColor
//     : s.textColor;

//   return (
//     <div style={{ textAlign: s.alignment || "left" }}>
//       <a
//         id={g.buttonId}
//         href={isPreview ? g.link || "#" : "#"}
//         target={g.linkTarget || "_self"}
//         onMouseEnter={() => !isPreview && setHover(true)}
//         onMouseLeave={() => !isPreview && setHover(false)}
//         onClick={(e) => {
//           if (!isPreview) e.preventDefault(); // edit mode me navigation block
//         }}
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: g.iconSpacing || 6,

//           background: background || "#2563eb",
//           color: textColor || "#fff",
//           padding: s.padding || "12px 20px",

//           fontSize: s.typography?.fontSize || "16px",
//           fontWeight: s.typography?.fontWeight || "600",
//           fontFamily: s.typography?.fontFamily || "inherit",
//           lineHeight: s.typography?.lineHeight || "1.2",
//           textShadow: s.textShadow || "none",

//           borderRadius: s.border?.radius || "6px",
//           border: `${s.border?.width || "1px"} ${
//             s.border?.style || "solid"
//           } ${s.border?.color || "transparent"}`,

//           transition: "all 0.25s ease",
//           cursor: isPreview ? "pointer" : "default",
//           textDecoration: "none",
//           pointerEvents: "auto",
//         }}
//       >
//         {g.icon && g.iconPosition === "left" && <Icon />}
//         {g.text || "Button"}
//         {g.icon && g.iconPosition === "right" && <Icon />}
//       </a>
//     </div>
//   );
// }
