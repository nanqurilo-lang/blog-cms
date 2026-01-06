import ButtonWidget from "../widgets/button-widget"
import HeadingWidget from "../widgets/heading-widget"
import TextWidget from "../widgets/text-widget"
import ImageWidget from "../widgets/image-widget"
import { BuilderElement } from "./types"

export default function ElementRenderer({
  element,
}: {
  element: BuilderElement
}) {
  switch (element.type) {
    case "button":
      return <ButtonWidget element={element} />
    case "heading":
      return <HeadingWidget element={element} />
    case "text":
      return <TextWidget element={element} />
    // case "image":
    //   return <ImageWidget element={element} />
    case "image":
  return <ImageWidget element={element} />

    default:
      return null
  }
}
