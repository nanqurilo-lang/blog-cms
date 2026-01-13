import TextWidget from "./widgets/TextWidget";
import ButtonWidget from "./widgets/ButtonWidget";
import ImageWidget from "./widgets/ImageWidget";

export default function WidgetRenderer({ widget }: any) {
  switch (widget.type) {
    case "button":
      return <ButtonWidget widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    case "image":
      return <ImageWidget widget={widget} />;
    default:
      return null;
  }
}
