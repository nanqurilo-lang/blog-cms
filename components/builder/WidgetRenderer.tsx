import TextWidget from "./widgets/TextWidget";
import ButtonWidget from "./widgets/ButtonWidget";

export default function WidgetRenderer({ widget }: any) {
  switch (widget.type) {
    case "button":
      return <ButtonWidget widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    default:
      return null;
  }
}
