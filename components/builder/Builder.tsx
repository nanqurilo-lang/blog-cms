// "use client";

// import { useState } from "react";
// import WidgetList from "./WidgetList";
// import Canvas from "./Canvas";
// import SettingsPanel from "./SettingsPanel";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";

// export default function Builder() {
//   const [widgets, setWidgets] = useState<any[]>([]);
//   const [activeId, setActiveId] = useState<string | null>(null);

//   function addWidget(type: string) {
//     const id = crypto.randomUUID();
//     setWidgets([
//       ...widgets,
//       {
//         id,
//         type,
//         general: {},
//         style: {},
//       },
//     ]);
//     setActiveId(id);
//   }

//   function updateWidget(section: string, key: string, value: any) {
//     setWidgets((prev) =>
//       prev.map((w) =>
//         w.id === activeId
//           ? {
//               ...w,
//               [section]: {
//                 ...w[section],
//                 [key]: value,
//               },
//             }
//           : w
//       )
//     );
//   }

//   function onDragEnd(event: any) {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setWidgets((items) => {
//       const oldIndex = items.findIndex((i) => i.id === active.id);
//       const newIndex = items.findIndex((i) => i.id === over.id);
//       return arrayMove(items, oldIndex, newIndex);
//     });
//   }

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
//       <div className="flex h-screen">
//         <WidgetList addWidget={addWidget} />

//         <Canvas
//           widgets={widgets}
//           activeId={activeId}
//           setActiveId={setActiveId}
//         />

//         <SettingsPanel
//           widget={widgets.find((w) => w.id === activeId)}
//           updateWidget={updateWidget}
//         />
//       </div>
//     </DndContext>
//   );
// }





"use client";

import { useState } from "react";
import WidgetList from "./WidgetList";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import EditorToolbar from "./EditorToolbar";
import { EditorProvider, useEditor } from "./EditorProvider";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

/* ---------------- INNER BUILDER ---------------- */

function BuilderContent() {
  const { state, dispatch } = useEditor();
  const widgets = state.present.widgets;

  const [activeId, setActiveId] = useState<string | null>(null);

  /* ➕ ADD WIDGET */
  function addWidget(type: string) {
    const id = crypto.randomUUID();

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: [
          ...widgets,
          {
            id,
            type,
            general: {},
            style: {},
          },
        ],
      },
    });

    setActiveId(id);
  }

  /* ✏️ UPDATE WIDGET (FROM SETTINGS PANEL) */
  function updateWidget(section: string, key: string, value: any) {
    if (!activeId) return;

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: widgets.map((w: any) =>
          w.id === activeId
            ? {
                ...w,
                [section]: {
                  ...w[section],
                  [key]: value,
                },
              }
            : w
        ),
      },
    });
  }

  /* 🔀 DRAG & DROP */
  function onDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex((i: any) => i.id === active.id);
    const newIndex = widgets.findIndex((i: any) => i.id === over.id);

    dispatch({
      type: "UPDATE",
      payload: {
        ...state.present,
        widgets: arrayMove(widgets, oldIndex, newIndex),
      },
    });
  }

  return (
    <>
      {/* 🔝 TOP TOOLBAR */}
      <EditorToolbar />

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-56px)]">
          <WidgetList addWidget={addWidget} />

          <Canvas
            widgets={widgets}
            activeId={activeId}
            setActiveId={setActiveId}
          />

          <SettingsPanel
            widget={widgets.find((w: any) => w.id === activeId)}
            updateWidget={updateWidget}
          />
        </div>
      </DndContext>
    </>
  );
}

/* ---------------- ROOT EXPORT ---------------- */

export default function Builder() {
  return (
    <EditorProvider>
      <BuilderContent />
    </EditorProvider>
  );
}
