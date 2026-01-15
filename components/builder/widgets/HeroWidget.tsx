// "use client";

// export default function HeroWidget({ widget }: any) {
//   const g = widget.general || {};
//   const s = widget.style || {};

//   const bgStyle =
//     g.bgType === "image"
//       ? {
//           backgroundImage: `url(${g.bgImage})`,
//           backgroundSize: s.bgSize || "cover",
//           backgroundPosition: s.bgPosition || "center",
//         }
//       : g.bgType === "gradient"
//       ? {
//           background: g.bgGradient || "linear-gradient(to right, #111, #333)",
//         }
//       : {
//           background: g.bgColor || "#0f172a",
//         };

//   return (
//     <section
//       style={{
//         ...bgStyle,
//         height: s.height || "70vh",
//         padding: s.padding || "80px 20px",
//         position: "relative",
//         color: s.textColor || "#ffffff",
//         textAlign: g.align || "center",
//       }}
//     >
//       {/* Overlay */}
//       {s.overlayColor && (
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background: s.overlayColor,
//             opacity: s.overlayOpacity ?? 0.5,
//           }}
//         />
//       )}

//       <div
//         style={{
//           position: "relative",
//           maxWidth: "900px",
//           margin:
//             g.align === "left"
//               ? "0"
//               : g.align === "right"
//               ? "0 0 0 auto"
//               : "0 auto",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: s.title?.fontSize || "48px",
//             fontWeight: s.title?.fontWeight || "700",
//             marginBottom: "16px",
//           }}
//         >
//           {g.title || "Hero Title"}
//         </h1>

//         <h3
//           style={{
//             fontSize: s.subtitle?.fontSize || "22px",
//             fontWeight: s.subtitle?.fontWeight || "400",
//             marginBottom: "16px",
//           }}
//         >
//           {g.subtitle || "Hero subtitle goes here"}
//         </h3>

//         <p
//           style={{
//             fontSize: s.text?.fontSize || "18px",
//             marginBottom: "24px",
//           }}
//         >
//           {g.description ||
//             "This is hero description. Customize it from settings panel."}
//         </p>

//         {g.btnText && (
//           <a
//             href={g.btnLink || "#"}
//             style={{
//               display: "inline-block",
//               padding: s.button?.padding || "12px 28px",
//               background: s.button?.bg || "#2563eb",
//               color: s.button?.color || "#fff",
//               borderRadius: s.button?.radius || "6px",
//               textDecoration: "none",
//               fontWeight: "600",
//             }}
//           >
//             {g.btnText}
//           </a>
//         )}
//       </div>
//     </section>
//   );
// }





"use client";

import { useEditor } from "../EditorProvider";

export default function HeroWidget({ widget }: any) {
  const { state } = useEditor();
  const isPreview = state.mode === "preview";

  const g = widget.general || {};
  const s = widget.style || {};

  const bgStyle =
    g.bgType === "image"
      ? {
          backgroundImage: `url(${g.bgImage})`,
          backgroundSize: s.bgSize || "cover",
          backgroundPosition: s.bgPosition || "center",
        }
      : g.bgType === "gradient"
      ? {
          background: g.bgGradient || "linear-gradient(to right, #111, #333)",
        }
      : {
          background: g.bgColor || "#0f172a",
        };

  return (
    <section
      style={{
        ...bgStyle,
        height: s.height || "70vh",
        padding: s.padding || "80px 20px",
        position: "relative",
        color: s.textColor || "#ffffff",
        textAlign: g.align || "center",
      }}
    >
      {/* Overlay */}
      {s.overlayColor && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: s.overlayColor,
            opacity: s.overlayOpacity ?? 0.5,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          maxWidth: "900px",
          margin:
            g.align === "left"
              ? "0"
              : g.align === "right"
              ? "0 0 0 auto"
              : "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: s.title?.fontSize || "48px",
            fontWeight: s.title?.fontWeight || "700",
            marginBottom: "16px",
          }}
        >
          {g.title || "Hero Title"}
        </h1>

        <h3
          style={{
            fontSize: s.subtitle?.fontSize || "22px",
            fontWeight: s.subtitle?.fontWeight || "400",
            marginBottom: "16px",
          }}
        >
          {g.subtitle || "Hero subtitle goes here"}
        </h3>

        <p
          style={{
            fontSize: s.text?.fontSize || "18px",
            marginBottom: "24px",
          }}
        >
          {g.description ||
            "This is hero description. Customize it from settings panel."}
        </p>

        {g.btnText && (
          <a
            href={isPreview ? g.btnLink || "#" : "#"}
            onClick={(e) => {
              if (!isPreview) e.preventDefault();
            }}
            style={{
              display: "inline-block",
              padding: s.button?.padding || "12px 28px",
              background: s.button?.bg || "#2563eb",
              color: s.button?.color || "#fff",
              borderRadius: s.button?.radius || "6px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {g.btnText}
          </a>
        )}
      </div>
    </section>
  );
}
