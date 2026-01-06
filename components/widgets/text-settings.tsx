"use client"
import { TextWidgetType } from "../builder/types"

export default function TextSettings({
  element,
  onChange,
}: {
  element: TextWidgetType
  onChange: (el: TextWidgetType) => void
}) {
  const update = (key: string, value: string) => {
    onChange({
      ...element,
      props: { ...element.props, [key]: value },
    })
  }

  return (
    <>
      <label>Text</label>
      <textarea
        value={element.props.text}
        onChange={(e) => update("text", e.target.value)}
        className="input"
      />

      <label>Color</label>
      <input
        type="color"
        value={element.props.color}
        onChange={(e) => update("color", e.target.value)}
      />

      <label>Font Size</label>
      <input
        value={element.props.fontSize}
        onChange={(e) => update("fontSize", e.target.value)}
        className="input"
        placeholder="16px"
      />
    </>
  )
}
