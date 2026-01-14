export default function WidgetList({ addWidget }: any) {
  return (
    <div className="w-64 border-r p-4 space-y-2">
      <h3 className="font-bold">Widgets</h3>

      <button onClick={() => addWidget("button")} className="btn">
        ➕ Button
      </button>
       <button onClick={() => addWidget("text")} className="btn">
        📝 Text Editor
      </button>

      <button onClick={() => addWidget("image")} className="btn">
  🖼 Image
</button>

<button onClick={() => addWidget("paragraph")} className="btn">
  📄 Paragraph
</button>
<button onClick={() => addWidget("separator")} className="btn">
  ➖ Separator
</button>

<button onClick={() => addWidget("hero")} className="btn">
  🧲 Hero Section
</button>


    </div>
  );
}
