"use client"

import { BuilderElement } from "../builder/types"

import ButtonSettings from "../widgets/button-settings"
import HeadingSettings from "../widgets/heading-settings"
import TextSettings from "../widgets/text-settings"
import ImageSettings from "../widgets/image-settings"

export default function SettingsPanel({
  element,
  onChange,
}: {
  element?: BuilderElement
  onChange: (el: BuilderElement) => void
}) {
  if (!element) {
    return (
      <aside className="w-80 border-l p-4 text-sm text-muted-foreground">
        Select a widget
      </aside>
    )
  }

  return (
    <aside className="w-80 border-l bg-background p-4 overflow-y-auto">
      {element.type === "button" && (
        <ButtonSettings element={element} onChange={onChange} />
      )}

      {element.type === "heading" && (
        <HeadingSettings element={element} onChange={onChange} />
      )}

      {element.type === "text" && (
        <TextSettings element={element} onChange={onChange} />
      )}

      {element.type === "image" && (
        <ImageSettings element={element} onChange={onChange} />
      )}
    </aside>
  )
}
