"use client"

const ELEMENTS = [
  { type: "heading", label: "Heading" },
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "image", label: "Image" },
]

export default function ElementsPanel() {
  return (
    <aside className="w-72 border-r bg-background p-4">
      <h3 className="text-sm font-semibold mb-4">Elements</h3>

      <div className="grid grid-cols-2 gap-3">
        {ELEMENTS.map((el) => (
          <div
            key={el.type}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("elementType", el.type)
            }
            className="border rounded-md p-3 text-sm text-center cursor-move hover:bg-muted"
          >
            {el.label}
          </div>
        ))}
      </div>
    </aside>
  )
}
