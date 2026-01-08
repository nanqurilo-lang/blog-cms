import ButtonWidget from "./widgets/ButtonWidget";

export default function WidgetRenderer({ widget }: any) {
  switch (widget.type) {
    case "button":
      return <ButtonWidget widget={widget} />;
    default:
      return null;
  }
}
