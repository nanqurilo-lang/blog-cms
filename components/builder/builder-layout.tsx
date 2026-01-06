"use client"


import ElementsPanel from "./elements-panel"
// import ElementsPanel from "./elements-panel"
import EditorCanvas from "./editor-canvas"
import TopActions from "./top-actions"

export default function BuilderLayout() {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <TopActions />

      {/* Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <ElementsPanel />

        {/* Canvas */}
        <EditorCanvas />
      </div>
    </div>
  )
}
