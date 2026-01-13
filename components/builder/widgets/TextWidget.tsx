"use client";

export default function TextWidget({ widget }: any) {
  const g = widget.general || {};
  const s = widget.style || {};

  return (
    <div
      style={{
        textAlign: s.alignment || "left",
        color: s.textColor || "#000",
        background: s.background || "transparent",
        padding: s.padding || "0px",

        fontSize: s.typography?.fontSize || "16px",
        fontWeight: s.typography?.fontWeight || "400",
        lineHeight: s.typography?.lineHeight || "1.5",
        fontFamily: s.typography?.fontFamily || "inherit",
      }}
    >
      {g.text || "Write your text here"}
    </div>
  );
}
