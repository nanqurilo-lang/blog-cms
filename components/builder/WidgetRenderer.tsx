import TextWidget from "./widgets/TextWidget";
import ButtonWidget from "./widgets/ButtonWidget";
import ImageWidget from "./widgets/ImageWidget";
import ParagraphWidget from "./widgets/ParagraphWidget";
import SeparatorWidget from "./widgets/SeparatorWidget";
import HeroWidget from "./widgets/HeroWidget";

export default function WidgetRenderer({ widget }: any) {
  switch (widget.type) {
    case "button":
      return <ButtonWidget widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    case "image":
      return <ImageWidget widget={widget} />;

     case "paragraph":
      return <ParagraphWidget widget={widget} />;
    case "separator":
      return <SeparatorWidget widget={widget} />;
    case "hero":
      return <HeroWidget widget={widget} />;
    default:
      return null;
  }
}
