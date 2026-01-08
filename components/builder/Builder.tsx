"use client";

import { useState } from "react";
import WidgetList from "./WidgetList";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function Builder() {
  const [widgets, setWidgets] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  function addWidget(type: string) {
    const id = crypto.randomUUID();
    setWidgets([
      ...widgets,
      {
        id,
        type,
        general: {},
        style: {},
      },
    ]);
    setActiveId(id);
  }

  function updateWidget(section: string, key: string, value: any) {
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === activeId
          ? {
              ...w,
              [section]: {
                ...w[section],
                [key]: value,
              },
            }
          : w
      )
    );
  }

  function onDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setWidgets((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <WidgetList addWidget={addWidget} />

        <Canvas
          widgets={widgets}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        <SettingsPanel
          widget={widgets.find((w) => w.id === activeId)}
          updateWidget={updateWidget}
        />
      </div>
    </DndContext>
  );
}
