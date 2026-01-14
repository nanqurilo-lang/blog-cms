"use client";

export default function SeparatorWidget({ widget }: any) {
  const g = widget.general || {};
  const s = widget.style || {};

  return (
    <div
      style={{
        textAlign: s.alignment || "center",
        padding: s.padding || "10px 0",
        margin: s.margin || "0",
        opacity: s.opacity ?? 1,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: g.width || "100%",
          height: g.thickness || "2px",
          backgroundColor: s.color || "#e5e7eb",
          borderRadius: s.radius || "0px",
          borderTop:
            g.type === "solid"
              ? "none"
              : `${g.thickness || "2px"} ${g.type || "solid"} ${
                  s.color || "#e5e7eb"
                }`,
          background:
            g.type === "solid" ? s.color || "#e5e7eb" : "transparent",
        }}
      />
    </div>
  );
}
