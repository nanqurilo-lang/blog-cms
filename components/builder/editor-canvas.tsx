

// "use client"

// import { useState } from "react"
// import ElementRenderer from "./element-renderer"
// import SettingsPanel from "./settings-panel"
// import {
//   BuilderElement,
//   createButtonWidget,
//   createHeadingWidget,
//   createTextWidget,
//   createImageWidget,
// } from "./types"

// export default function EditorCanvas() {
//   const [elements, setElements] = useState<BuilderElement[]>([])
//   const [activeId, setActiveId] = useState<string | null>(null)

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     const type = e.dataTransfer.getData("elementType")

//     setElements((prev) => {
//       switch (type) {
//         case "button":
//           return [...prev, createButtonWidget()]
//         case "heading":
//           return [...prev, createHeadingWidget()]
//         case "text":
//           return [...prev, createTextWidget()]
//         case "image":
//           return [...prev, createImageWidget()]
//         default:
//           return prev
//       }
//     })
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
//             className={`mb-4 ${
//               activeId === el.id ? "ring-2 ring-primary p-1" : ""
//             }`}
//           >
//             <ElementRenderer element={el} />
//           </div>
//         ))}
//       </div>

//       {/* SETTINGS PANEL */}
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







// "use client"

// import { useState } from "react"

// import ElementRenderer from "./element-renderer"
// import SettingsPanel from "./settings-panel"
// import WidgetControls from "./widget-controls"

// import {
//   BuilderElement,
//   createButtonWidget,
//   createHeadingWidget,
//   createTextWidget,
//   createImageWidget,
// } from "./types"

// export default function EditorCanvas() {
//   const [elements, setElements] = useState<BuilderElement[]>([])
//   const [activeId, setActiveId] = useState<string | null>(null)

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     const type = e.dataTransfer.getData("elementType")

//     setElements((prev) => {
//       switch (type) {
//         case "button":
//           return [...prev, createButtonWidget()]
//         case "heading":
//           return [...prev, createHeadingWidget()]
//         case "text":
//           return [...prev, createTextWidget()]
//         case "image":
//           return [...prev, createImageWidget()]
//         default:
//           return prev
//       }
//     })
//   }

//   const activeElement = elements.find((e) => e.id === activeId)

//   return (
//     <div className="flex flex-1">
//       {/* ================= CANVAS ================= */}
//       <div
//         className="flex-1 bg-muted/40 p-10 space-y-4"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         {elements.length === 0 && (
//           <div className="border-2 border-dashed rounded-lg p-10 text-center bg-background max-w-md mx-auto mt-20">
//             <p className="font-medium">Start Building</p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Drag elements from the left panel
//             </p>
//           </div>
//         )}

//         {elements.map((el) => (
//           <div
//             key={el.id}
//             onClick={(e) => {
//               e.stopPropagation()
//               setActiveId(el.id)
//             }}
//             className={`relative bg-background ${
//               activeId === el.id ? "ring-2 ring-primary p-1" : ""
//             }`}
//           >
//             {/* 🔥 WIDGET CONTROLS (Elementor style) */}
//             {activeId === el.id && (
//               <WidgetControls
//                 onDelete={() =>
//                   setElements((prev) =>
//                     prev.filter((item) => item.id !== el.id)
//                   )
//                 }
//                 onDuplicate={() =>
//                   setElements((prev) => [
//                     ...prev,
//                     { ...el, id: crypto.randomUUID() },
//                   ])
//                 }
//               />
//             )}

//             <ElementRenderer
//               element={el}
//               isActive={activeId === el.id}
//               onSelect={() => setActiveId(el.id)}
//             />
//           </div>
//         ))}
//       </div>

//       {/* ================= SETTINGS PANEL ================= */}
//       <SettingsPanel
//         element={activeElement}
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
import WidgetControls from "../widgets/widget-controls"
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

  const activeElement = elements.find((e) => e.id === activeId)

  return (
    <div className="flex flex-1">
      {/* ================= CANVAS ================= */}
      <div
        className="flex-1 bg-muted/40 p-10 space-y-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {elements.length === 0 && (
          <div className="border-2 border-dashed rounded-lg p-10 text-center bg-background max-w-md mx-auto mt-20">
            <p className="font-medium">Start Building</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag elements from the left panel
            </p>
          </div>
        )}

        {elements.map((el) => (
          <div
            key={el.id}
            onClick={(e) => {
              e.stopPropagation()
              setActiveId(el.id)
            }}
            className={`relative bg-background ${
              activeId === el.id ? "ring-2 ring-primary p-1" : ""
            }`}
          >
            {/* 🔥 WIDGET CONTROLS (Elementor style) */}
            {activeId === el.id && (
              <WidgetControls
                onDelete={() =>
                  setElements((prev) =>
                    prev.filter((item) => item.id !== el.id)
                  )
                }
                onDuplicate={() =>
                  setElements((prev) => [
                    ...prev,
                    { ...el, id: crypto.randomUUID() },
                  ])
                }
              />
            )}

            <ElementRenderer
              element={el}
              isActive={activeId === el.id}
              onSelect={() => setActiveId(el.id)}
            />
          </div>
        ))}
      </div>

      {/* ================= SETTINGS PANEL ================= */}
      <SettingsPanel
        element={activeElement}
        onChange={(updated) =>
          setElements((prev) =>
            prev.map((el) => (el.id === updated.id ? updated : el))
          )
        }
      />
    </div>
  )
}

