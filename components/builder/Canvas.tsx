import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../dnd/SortableItem";
import WidgetRenderer from "./WidgetRenderer";

export default function Canvas({ widgets, activeId, setActiveId }: any) {
  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <SortableContext
        items={widgets.map((w: any) => w.id)}
        strategy={verticalListSortingStrategy}
      >
        {widgets.map((widget: any) => (
          <SortableItem key={widget.id} id={widget.id}>
            <div
              onClick={() => setActiveId(widget.id)}
              className={`p-4 mb-3 border ${
                activeId === widget.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <WidgetRenderer widget={widget} />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </div>
  );
}
