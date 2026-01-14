"use client";

export default function ParagraphWidget({ widget }: any) {
  const g = widget.general || {};
  const s = widget.style || {};

  return (
    <p
      style={{
        textAlign: s.alignment || "left",
        color: s.textColor || "#000",
        background: s.background || "transparent",

        fontSize: s.typography?.fontSize || "16px",
        fontWeight: s.typography?.fontWeight || "400",
        lineHeight: s.typography?.lineHeight || "1.6",
        letterSpacing: s.typography?.letterSpacing || "0px",

        padding: s.padding || "0px",
        margin: s.margin || "0px",

        border: `${s.border?.width || "0px"} ${s.border?.style || "solid"} ${
          s.border?.color || "transparent"
        }`,
        borderRadius: s.border?.radius || "0px",
      }}
    >
      {g.text || "This is a paragraph. Edit me from settings panel."}
    </p>
  );
}
