"use client"
import { TextWidgetType } from "../builder/types"

export default function TextWidget({
  element,
}: {
  element: TextWidgetType
}) {
  return (
    <p
      style={{
        color: element.props.color,
        fontSize: element.props.fontSize,
      }}
    >
      {element.props.text}
    </p>
  )
}
