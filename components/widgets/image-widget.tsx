"use client"

import { ImageWidgetType } from "../builder/types"

export default function ImageWidget({
  element,
}: {
  element: ImageWidgetType
}) {
  return (
    <img
      src={element.props.src}
      style={{
        width: element.props.width,
        borderRadius: element.props.borderRadius,
      }}
      alt=""
    />
  )
}
