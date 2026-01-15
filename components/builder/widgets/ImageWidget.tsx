// "use client";

// import { useState } from "react";

// export default function ImageWidget({ widget }: any) {
//   const g = widget.general || {};
//   const s = widget.style || {};
//   const [hover, setHover] = useState(false);

//   const image = (
//     <img
//       src={g.src || "https://via.placeholder.com/400x250"}
//       alt={g.alt || ""}
//       style={{
//         width: g.width || "auto",
//         maxWidth: "100%",
//         display: "block",
//         opacity: hover ? s.hover?.opacity ?? 1 : 1,
//         borderRadius: s.border?.radius || "0px",
//         border: `${s.border?.width || "0px"} ${s.border?.style || "solid"} ${
//           s.border?.color || "transparent"
//         }`,
//         boxShadow: s.boxShadow || "none",
//         transition: "all 0.3s ease",
//       }}
//     />
//   );

//   return (
//     <div
//       style={{
//         textAlign: s.alignment || "left",
//         padding: s.padding || "0px",
//       }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {g.link ? (
//         <a href={g.link} target={g.linkTarget || "_self"}>
//           {image}
//         </a>
//       ) : (
//         image
//       )}
//       {g.caption && (
//         <div className="text-sm mt-2 text-gray-600">{g.caption}</div>
//       )}
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { useEditor } from "../EditorProvider";

export default function ImageWidget({ widget }: any) {
  const { state } = useEditor();
  const isPreview = state.mode === "preview";

  const g = widget.general || {};
  const s = widget.style || {};
  const [hover, setHover] = useState(false);

  const image = (
    <img
      src={g.src || "https://via.placeholder.com/400x250"}
      alt={g.alt || ""}
      style={{
        width: g.width || "auto",
        maxWidth: "100%",
        display: "block",
        opacity: hover ? s.hover?.opacity ?? 1 : 1,
        borderRadius: s.border?.radius || "0px",
        border: `${s.border?.width || "0px"} ${s.border?.style || "solid"} ${
          s.border?.color || "transparent"
        }`,
        boxShadow: s.boxShadow || "none",
        transition: "all 0.3s ease",
      }}
    />
  );

  return (
    <div
      style={{
        textAlign: s.alignment || "left",
        padding: s.padding || "0px",
      }}
      onMouseEnter={() => !isPreview && setHover(true)}
      onMouseLeave={() => !isPreview && setHover(false)}
    >
      {g.link ? (
        <a
          href={isPreview ? g.link : "#"}
          target={g.linkTarget || "_self"}
          onClick={(e) => {
            if (!isPreview) e.preventDefault();
          }}
        >
          {image}
        </a>
      ) : (
        image
      )}

      {g.caption && (
        <div className="text-sm mt-2 text-gray-600">{g.caption}</div>
      )}
    </div>
  );
}
