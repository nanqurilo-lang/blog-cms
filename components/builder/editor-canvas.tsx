// "use client"

// import { useState } from "react"
// import ElementRenderer from "./element-renderer"
// import SettingsPanel from "./settings-panel"
// import { BuilderElement } from "../builder/types"

// export default function EditorCanvas() {
//   const [elements, setElements] = useState<BuilderElement[]>([])
//   const [activeId, setActiveId] = useState<string | null>(null)

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()

//     const type = e.dataTransfer.getData("elementType")

//     if (type === "button") {
//       setElements((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           type: "button",
//           props: {
//             text: "Click Me",
//             link: "#",
//             bgColor: "#2563eb",
//             textColor: "#ffffff",
//             padding: "12px 24px",
//             borderRadius: "6px",
//           },
//         },
//       ])
//     }
//   }

//   return (
//     <div className="flex flex-1">
//       {/* CANVAS */}
//       <div
//         className="flex-1 bg-muted/40 p-10"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         {elements.map((el) => (
//           <div
//             key={el.id}
//             onClick={() => setActiveId(el.id)}
//             className={activeId === el.id ? "ring-2 ring-primary" : ""}
//           >
//             <ElementRenderer element={el} />
//           </div>
//         ))}
//       </div>

//       {/* RIGHT SETTINGS */}
//       <SettingsPanel
//         element={elements.find((e) => e.id === activeId)}
//         onChange={(updated) =>
//           setElements((prev) =>
//             prev.map((el) => (el.id === updated.id ? updated : el))
//           )
//         }
//       />
//     </div>
//   )
// }





"use client"

import { useState } from "react"
import ElementRenderer from "./element-renderer"
import SettingsPanel from "./settings-panel"
import {
  BuilderElement,
  createButtonWidget,
  createHeadingWidget,
  createTextWidget,
  createImageWidget,
} from "./types"

export default function EditorCanvas() {
  const [elements, setElements] = useState<BuilderElement[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const type = e.dataTransfer.getData("elementType")

    setElements((prev) => {
      switch (type) {
        case "button":
          return [...prev, createButtonWidget()]
        case "heading":
          return [...prev, createHeadingWidget()]
        case "text":
          return [...prev, createTextWidget()]
        case "image":
          return [...prev, createImageWidget()]
        default:
          return prev
      }
    })
  }

  return (
    <div className="flex flex-1">
      {/* CANVAS */}
      <div
        className="flex-1 bg-muted/40 p-10"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => setActiveId(el.id)}
            className={`mb-4 ${
              activeId === el.id ? "ring-2 ring-primary p-1" : ""
            }`}
          >
            <ElementRenderer element={el} />
          </div>
        ))}
      </div>

      {/* SETTINGS PANEL */}
      <SettingsPanel
        element={elements.find((e) => e.id === activeId)}
        onChange={(updated) =>
          setElements((prev) =>
            prev.map((el) => (el.id === updated.id ? updated : el))
          )
        }
      />
    </div>
  )
}

