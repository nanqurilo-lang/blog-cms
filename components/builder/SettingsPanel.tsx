"use client";

import { type ReactNode, useState } from "react";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500";
const selectClass = inputClass;
const textareaClass = `${inputClass} min-h-[96px] resize-y`;
const checkboxClass = "h-4 w-4 rounded border-gray-300";
const sectionTitleClass = "text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500";

type SettingsPanelProps = {
  widget: any;
  updateWidget: (section: string, key: string, value: any) => void;
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-lg border border-gray-200 bg-gray-50/70 p-3">
      <div className={sectionTitleClass}>{title}</div>
      {children}
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

export default function SettingsPanel({ widget, updateWidget }: SettingsPanelProps) {
  const [tab, setTab] = useState<"general" | "style">("general");

  if (!widget) {
    return <div className="w-96 border-l p-4 text-gray-500">Select a widget</div>;
  }

  const g = widget.general || {};
  const s = widget.style || {};

  const isButton = widget.type === "button";
  const isText = widget.type === "text";
  const isImage = widget.type === "image";
  const isParagraph = widget.type === "paragraph";
  const isSeparator = widget.type === "separator";
  const isHero = widget.type === "hero";

  const updateTypography = (key: string, value: any) => {
    updateWidget("style", "typography", {
      ...(s.typography || {}),
      [key]: value,
    });
  };

  const updateBorder = (key: string, value: any) => {
    updateWidget("style", "border", {
      ...(s.border || {}),
      [key]: value,
    });
  };

  const updateHover = (key: string, value: any) => {
    updateWidget("style", "hover", {
      ...(s.hover || {}),
      [key]: value,
    });
  };

  const updateHeroStyle = (key: string, value: any) => {
    updateWidget("style", key, value);
  };

  return (
    <div className="w-96 border-l p-4 text-sm overflow-y-auto bg-white">
      <div className="mb-4 flex rounded-lg bg-gray-100 p-1">
        <button
          className={`flex-1 rounded-md px-3 py-2 text-sm ${
            tab === "general" ? "bg-white font-semibold shadow-sm" : "text-gray-600"
          }`}
          onClick={() => setTab("general")}
          type="button"
        >
          General
        </button>
        <button
          className={`flex-1 rounded-md px-3 py-2 text-sm ${
            tab === "style" ? "bg-white font-semibold shadow-sm" : "text-gray-600"
          }`}
          onClick={() => setTab("style")}
          type="button"
        >
          Style
        </button>
      </div>

      {tab === "general" && (
        <div className="space-y-4">
          {isText && (
            <>
              <Section title="Content">
                <Field label="Text">
                  <textarea
                    className={textareaClass}
                    placeholder="Write your text..."
                    value={g.text || ""}
                    onChange={(e) => updateWidget("general", "text", e.target.value)}
                  />
                </Field>
              </Section>

              <Section title="Structure">
                <Row>
                  <Field label="HTML Tag">
                    <select className={selectClass} value={g.htmlTag || "div"} onChange={(e) => updateWidget("general", "htmlTag", e.target.value)}>
                      <option value="div">Div</option>
                      <option value="p">Paragraph</option>
                      <option value="span">Span</option>
                      <option value="blockquote">Blockquote</option>
                    </select>
                  </Field>
                  <Field label="Preset Style">
                    <select className={selectClass} value={g.variant || "default"} onChange={(e) => updateWidget("general", "variant", e.target.value)}>
                      <option value="default">Default</option>
                      <option value="lead">Lead</option>
                      <option value="muted">Muted</option>
                      <option value="accent">Accent</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Link">
                <Field label="Optional Link URL">
                  <input className={inputClass} placeholder="https://example.com" value={g.link || ""} onChange={(e) => updateWidget("general", "link", e.target.value)} />
                </Field>
                <Row>
                  <Field label="Open In">
                    <select className={selectClass} value={g.linkTarget || "_self"} onChange={(e) => updateWidget("general", "linkTarget", e.target.value)}>
                      <option value="_self">Same tab</option>
                      <option value="_blank">New tab</option>
                    </select>
                  </Field>
                  <Field label="Aria Label">
                    <input className={inputClass} placeholder="Accessible label" value={g.ariaLabel || ""} onChange={(e) => updateWidget("general", "ariaLabel", e.target.value)} />
                  </Field>
                </Row>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input className={checkboxClass} type="checkbox" checked={Boolean(g.noFollow)} onChange={(e) => updateWidget("general", "noFollow", e.target.checked)} />
                  Add nofollow rel
                </label>
              </Section>
            </>
          )}

          {isParagraph && (
            <>
              <Section title="Content">
                <Field label="Paragraph">
                  <textarea
                    className={textareaClass}
                    placeholder="Write paragraph content..."
                    value={g.text || ""}
                    onChange={(e) => updateWidget("general", "text", e.target.value)}
                  />
                </Field>
              </Section>

              <Section title="Structure">
                <Row>
                  <Field label="HTML Tag">
                    <select className={selectClass} value={g.htmlTag || "p"} onChange={(e) => updateWidget("general", "htmlTag", e.target.value)}>
                      <option value="p">Paragraph</option>
                      <option value="div">Div</option>
                      <option value="blockquote">Blockquote</option>
                    </select>
                  </Field>
                  <Field label="Preset Style">
                    <select className={selectClass} value={g.variant || "body"} onChange={(e) => updateWidget("general", "variant", e.target.value)}>
                      <option value="body">Body</option>
                      <option value="intro">Intro</option>
                      <option value="compact">Compact</option>
                      <option value="emphasis">Emphasis</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Link">
                <Field label="Optional Link URL">
                  <input className={inputClass} placeholder="https://example.com" value={g.link || ""} onChange={(e) => updateWidget("general", "link", e.target.value)} />
                </Field>
                <Row>
                  <Field label="Open In">
                    <select className={selectClass} value={g.linkTarget || "_self"} onChange={(e) => updateWidget("general", "linkTarget", e.target.value)}>
                      <option value="_self">Same tab</option>
                      <option value="_blank">New tab</option>
                    </select>
                  </Field>
                  <Field label="Aria Label">
                    <input className={inputClass} placeholder="Accessible label" value={g.ariaLabel || ""} onChange={(e) => updateWidget("general", "ariaLabel", e.target.value)} />
                  </Field>
                </Row>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input className={checkboxClass} type="checkbox" checked={Boolean(g.noFollow)} onChange={(e) => updateWidget("general", "noFollow", e.target.checked)} />
                  Add nofollow rel
                </label>
              </Section>
            </>
          )}

          {isButton && (
            <>
              <Section title="Content">
                <Field label="Button Text">
                  <input className={inputClass} placeholder="Read More" value={g.text || ""} onChange={(e) => updateWidget("general", "text", e.target.value)} />
                </Field>
                <Field label="Aria Label">
                  <input className={inputClass} placeholder="Accessible label" value={g.ariaLabel || ""} onChange={(e) => updateWidget("general", "ariaLabel", e.target.value)} />
                </Field>
              </Section>

              <Section title="Link">
                <Field label="URL">
                  <input className={inputClass} placeholder="https://example.com" value={g.link || ""} onChange={(e) => updateWidget("general", "link", e.target.value)} />
                </Field>
                <Row>
                  <Field label="Open In">
                    <select className={selectClass} value={g.linkTarget || "_self"} onChange={(e) => updateWidget("general", "linkTarget", e.target.value)}>
                      <option value="_self">Same tab</option>
                      <option value="_blank">New tab</option>
                    </select>
                  </Field>
                  <Field label="Button ID">
                    <input className={inputClass} placeholder="cta-button" value={g.buttonId || ""} onChange={(e) => updateWidget("general", "buttonId", e.target.value)} />
                  </Field>
                </Row>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input className={checkboxClass} type="checkbox" checked={Boolean(g.noFollow)} onChange={(e) => updateWidget("general", "noFollow", e.target.checked)} />
                  Add nofollow rel
                </label>
              </Section>

              <Section title="Layout">
                <Row>
                  <Field label="Preset Size">
                    <select className={selectClass} value={g.size || "md"} onChange={(e) => updateWidget("general", "size", e.target.value)}>
                      <option value="xs">Extra Small</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                    </select>
                  </Field>
                  <Field label="Width Mode">
                    <select className={selectClass} value={g.widthMode || "auto"} onChange={(e) => updateWidget("general", "widthMode", e.target.value)}>
                      <option value="auto">Auto</option>
                      <option value="full">Full Width</option>
                      <option value="custom">Custom Width</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Alignment">
                    <select className={selectClass} value={s.alignment || "left"} onChange={(e) => updateWidget("style", "alignment", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </Field>
                  <Field label="Min Width">
                    <input className={inputClass} placeholder="180px" value={s.minWidth || ""} onChange={(e) => updateWidget("style", "minWidth", e.target.value)} />
                  </Field>
                </Row>
                {g.widthMode === "custom" && (
                  <Field label="Custom Width">
                    <input className={inputClass} placeholder="260px or 100%" value={s.width || ""} onChange={(e) => updateWidget("style", "width", e.target.value)} />
                  </Field>
                )}
              </Section>

              <Section title="Icon">
                <Row>
                  <Field label="Icon">
                    <select className={selectClass} value={g.icon || ""} onChange={(e) => updateWidget("general", "icon", e.target.value)}>
                      <option value="">None</option>
                      <option value="arrow-right">Arrow Right</option>
                      <option value="arrow-left">Arrow Left</option>
                      <option value="check">Check</option>
                      <option value="plus">Plus</option>
                      <option value="download">Download</option>
                      <option value="external">External</option>
                      <option value="mail">Mail</option>
                    </select>
                  </Field>
                  <Field label="Position">
                    <select className={selectClass} value={g.iconPosition || "right"} onChange={(e) => updateWidget("general", "iconPosition", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Icon Size">
                    <input className={inputClass} type="number" min="8" value={g.iconSize ?? 18} onChange={(e) => updateWidget("general", "iconSize", Number(e.target.value))} />
                  </Field>
                  <Field label="Icon Spacing">
                    <input className={inputClass} type="number" min="0" value={g.iconSpacing ?? 8} onChange={(e) => updateWidget("general", "iconSpacing", Number(e.target.value))} />
                  </Field>
                </Row>
              </Section>
            </>
          )}
          {isImage && (
            <>
              <Section title="Image Source">
                <Field label="Image URL"><input className={inputClass} placeholder="https://..." value={g.src || ""} onChange={(e) => updateWidget("general", "src", e.target.value)} /></Field>
                <Field label="Alt Text"><input className={inputClass} placeholder="Describe the image" value={g.alt || ""} onChange={(e) => updateWidget("general", "alt", e.target.value)} /></Field>
                <Row>
                  <Field label="Loading">
                    <select className={selectClass} value={g.loading || "lazy"} onChange={(e) => updateWidget("general", "loading", e.target.value)}>
                      <option value="lazy">Lazy</option>
                      <option value="eager">Eager</option>
                    </select>
                  </Field>
                  <Field label="Caption Position">
                    <select className={selectClass} value={g.captionPosition || "below"} onChange={(e) => updateWidget("general", "captionPosition", e.target.value)}>
                      <option value="below">Below</option>
                      <option value="above">Above</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Caption & Link">
                <Field label="Caption"><input className={inputClass} placeholder="Optional caption" value={g.caption || ""} onChange={(e) => updateWidget("general", "caption", e.target.value)} /></Field>
                <Field label="Link"><input className={inputClass} placeholder="Optional link" value={g.link || ""} onChange={(e) => updateWidget("general", "link", e.target.value)} /></Field>
                <Row>
                  <Field label="Open In">
                    <select className={selectClass} value={g.linkTarget || "_self"} onChange={(e) => updateWidget("general", "linkTarget", e.target.value)}>
                      <option value="_self">Same tab</option>
                      <option value="_blank">New tab</option>
                    </select>
                  </Field>
                  <Field label="Aria Label"><input className={inputClass} placeholder="Accessible label" value={g.ariaLabel || ""} onChange={(e) => updateWidget("general", "ariaLabel", e.target.value)} /></Field>
                </Row>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input className={checkboxClass} type="checkbox" checked={Boolean(g.noFollow)} onChange={(e) => updateWidget("general", "noFollow", e.target.checked)} />
                  Add nofollow rel
                </label>
              </Section>
            </>
          )}

          {isSeparator && (
            <>
              <Section title="Divider">
                <Row>
                  <Field label="Line Style">
                    <select className={selectClass} value={g.type || "solid"} onChange={(e) => updateWidget("general", "type", e.target.value)}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                    </select>
                  </Field>
                  <Field label="Thickness"><input className={inputClass} placeholder="2px" value={g.thickness || ""} onChange={(e) => updateWidget("general", "thickness", e.target.value)} /></Field>
                </Row>
                <Field label="Width"><input className={inputClass} placeholder="100% or 320px" value={g.width || ""} onChange={(e) => updateWidget("general", "width", e.target.value)} /></Field>
              </Section>

              <Section title="Label">
                <Field label="Separator Label"><input className={inputClass} placeholder="Optional label" value={g.label || ""} onChange={(e) => updateWidget("general", "label", e.target.value)} /></Field>
                <Field label="Label Position">
                  <select className={selectClass} value={g.labelPosition || "center"} onChange={(e) => updateWidget("general", "labelPosition", e.target.value)}>
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </Field>
              </Section>
            </>
          )}

          {isHero && (
            <>
              <Section title="Content">
                <Field label="Title"><input className={inputClass} placeholder="Hero title" value={g.title || ""} onChange={(e) => updateWidget("general", "title", e.target.value)} /></Field>
                <Field label="Subtitle"><input className={inputClass} placeholder="Hero subtitle" value={g.subtitle || ""} onChange={(e) => updateWidget("general", "subtitle", e.target.value)} /></Field>
                <Field label="Description"><textarea className={textareaClass} placeholder="Hero description" value={g.description || ""} onChange={(e) => updateWidget("general", "description", e.target.value)} /></Field>
              </Section>

              <Section title="Background">
                <Field label="Background Type">
                  <select className={selectClass} value={g.bgType || "color"} onChange={(e) => updateWidget("general", "bgType", e.target.value)}>
                    <option value="color">Color</option>
                    <option value="image">Image</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </Field>
                {g.bgType === "color" && <Field label="Background Color"><input className={inputClass} type="color" value={g.bgColor || "#0f172a"} onChange={(e) => updateWidget("general", "bgColor", e.target.value)} /></Field>}
                {g.bgType === "image" && <Field label="Background Image URL"><input className={inputClass} placeholder="https://..." value={g.bgImage || ""} onChange={(e) => updateWidget("general", "bgImage", e.target.value)} /></Field>}
                {g.bgType === "gradient" && <Field label="Gradient CSS"><input className={inputClass} placeholder="linear-gradient(...)" value={g.bgGradient || ""} onChange={(e) => updateWidget("general", "bgGradient", e.target.value)} /></Field>}
              </Section>
            </>
          )}
        </div>
      )}

      {tab === "style" && (
        <div className="space-y-4">
          {isText && (
            <>
              <Section title="Typography">
                <Row>
                  <Field label="Font Size"><input className={inputClass} placeholder="17px" value={s.typography?.fontSize || ""} onChange={(e) => updateTypography("fontSize", e.target.value)} /></Field>
                  <Field label="Font Weight"><input className={inputClass} placeholder="400" value={s.typography?.fontWeight || ""} onChange={(e) => updateTypography("fontWeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Font Family"><input className={inputClass} placeholder="inherit" value={s.typography?.fontFamily || ""} onChange={(e) => updateTypography("fontFamily", e.target.value)} /></Field>
                  <Field label="Line Height"><input className={inputClass} placeholder="1.7" value={s.typography?.lineHeight || ""} onChange={(e) => updateTypography("lineHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Letter Spacing"><input className={inputClass} placeholder="0px" value={s.typography?.letterSpacing || ""} onChange={(e) => updateTypography("letterSpacing", e.target.value)} /></Field>
                  <Field label="Text Transform">
                    <select className={selectClass} value={s.typography?.textTransform || "none"} onChange={(e) => updateTypography("textTransform", e.target.value)}>
                      <option value="none">None</option>
                      <option value="uppercase">Uppercase</option>
                      <option value="lowercase">Lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Text Decoration">
                    <select className={selectClass} value={s.typography?.textDecoration || "none"} onChange={(e) => updateTypography("textDecoration", e.target.value)}>
                      <option value="none">None</option>
                      <option value="underline">Underline</option>
                      <option value="line-through">Line Through</option>
                    </select>
                  </Field>
                  <Field label="Font Style">
                    <select className={selectClass} value={s.typography?.fontStyle || "normal"} onChange={(e) => updateTypography("fontStyle", e.target.value)}>
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Colors & Effects">
                <Row>
                  <Field label="Text Color"><input className={inputClass} type="color" value={s.textColor || "#111827"} onChange={(e) => updateWidget("style", "textColor", e.target.value)} /></Field>
                  <Field label="Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.opacity ?? 1} onChange={(e) => updateWidget("style", "opacity", Number(e.target.value))} /></Field>
                </Row>
                <Field label="Background CSS"><input className={inputClass} placeholder="transparent or linear-gradient(...)" value={s.background || ""} onChange={(e) => updateWidget("style", "background", e.target.value)} /></Field>
                <Field label="Text Shadow"><input className={inputClass} placeholder="none" value={s.textShadow || ""} onChange={(e) => updateWidget("style", "textShadow", e.target.value)} /></Field>
                <Field label="Box Shadow"><input className={inputClass} placeholder="none" value={s.boxShadow || ""} onChange={(e) => updateWidget("style", "boxShadow", e.target.value)} /></Field>
              </Section>

              <Section title="Layout">
                <Row>
                  <Field label="Alignment">
                    <select className={selectClass} value={s.alignment || "left"} onChange={(e) => updateWidget("style", "alignment", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                      <option value="justify">Justify</option>
                    </select>
                  </Field>
                  <Field label="Min Height"><input className={inputClass} placeholder="auto or 48px" value={s.minHeight || ""} onChange={(e) => updateWidget("style", "minHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Width"><input className={inputClass} placeholder="auto or 100%" value={s.width || ""} onChange={(e) => updateWidget("style", "width", e.target.value)} /></Field>
                  <Field label="Max Width"><input className={inputClass} placeholder="720px" value={s.maxWidth || ""} onChange={(e) => updateWidget("style", "maxWidth", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Padding"><input className={inputClass} placeholder="0px" value={s.padding || ""} onChange={(e) => updateWidget("style", "padding", e.target.value)} /></Field>
                  <Field label="Margin"><input className={inputClass} placeholder="0px" value={s.margin || ""} onChange={(e) => updateWidget("style", "margin", e.target.value)} /></Field>
                </Row>
                <Field label="Transition Duration"><input className={inputClass} placeholder="0.25s" value={s.transitionDuration || ""} onChange={(e) => updateWidget("style", "transitionDuration", e.target.value)} /></Field>
              </Section>

              <Section title="Border & Container">
                <Row>
                  <Field label="Border Width"><input className={inputClass} placeholder="0px" value={s.border?.width || ""} onChange={(e) => updateBorder("width", e.target.value)} /></Field>
                  <Field label="Border Style">
                    <select className={selectClass} value={s.border?.style || "solid"} onChange={(e) => updateBorder("style", e.target.value)}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Border Color"><input className={inputClass} type="color" value={s.border?.color || "#e5e7eb"} onChange={(e) => updateBorder("color", e.target.value)} /></Field>
                  <Field label="Border Radius"><input className={inputClass} placeholder="0px" value={s.border?.radius || ""} onChange={(e) => updateBorder("radius", e.target.value)} /></Field>
                </Row>
              </Section>
            </>
          )}

          {isParagraph && (
            <>
              <Section title="Typography">
                <Row>
                  <Field label="Font Size"><input className={inputClass} placeholder="17px" value={s.typography?.fontSize || ""} onChange={(e) => updateTypography("fontSize", e.target.value)} /></Field>
                  <Field label="Font Weight"><input className={inputClass} placeholder="400" value={s.typography?.fontWeight || ""} onChange={(e) => updateTypography("fontWeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Font Family"><input className={inputClass} placeholder="inherit" value={s.typography?.fontFamily || ""} onChange={(e) => updateTypography("fontFamily", e.target.value)} /></Field>
                  <Field label="Line Height"><input className={inputClass} placeholder="1.85" value={s.typography?.lineHeight || ""} onChange={(e) => updateTypography("lineHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Letter Spacing"><input className={inputClass} placeholder="0px" value={s.typography?.letterSpacing || ""} onChange={(e) => updateTypography("letterSpacing", e.target.value)} /></Field>
                  <Field label="Text Transform">
                    <select className={selectClass} value={s.typography?.textTransform || "none"} onChange={(e) => updateTypography("textTransform", e.target.value)}>
                      <option value="none">None</option>
                      <option value="uppercase">Uppercase</option>
                      <option value="lowercase">Lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Text Decoration">
                    <select className={selectClass} value={s.typography?.textDecoration || "none"} onChange={(e) => updateTypography("textDecoration", e.target.value)}>
                      <option value="none">None</option>
                      <option value="underline">Underline</option>
                      <option value="line-through">Line Through</option>
                    </select>
                  </Field>
                  <Field label="Font Style">
                    <select className={selectClass} value={s.typography?.fontStyle || "normal"} onChange={(e) => updateTypography("fontStyle", e.target.value)}>
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Colors & Effects">
                <Row>
                  <Field label="Text Color"><input className={inputClass} type="color" value={s.textColor || "#374151"} onChange={(e) => updateWidget("style", "textColor", e.target.value)} /></Field>
                  <Field label="Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.opacity ?? 1} onChange={(e) => updateWidget("style", "opacity", Number(e.target.value))} /></Field>
                </Row>
                <Field label="Background CSS"><input className={inputClass} placeholder="transparent or linear-gradient(...)" value={s.background || ""} onChange={(e) => updateWidget("style", "background", e.target.value)} /></Field>
                <Field label="Text Shadow"><input className={inputClass} placeholder="none" value={s.textShadow || ""} onChange={(e) => updateWidget("style", "textShadow", e.target.value)} /></Field>
                <Field label="Box Shadow"><input className={inputClass} placeholder="none" value={s.boxShadow || ""} onChange={(e) => updateWidget("style", "boxShadow", e.target.value)} /></Field>
              </Section>

              <Section title="Layout">
                <Row>
                  <Field label="Alignment">
                    <select className={selectClass} value={s.alignment || "left"} onChange={(e) => updateWidget("style", "alignment", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                      <option value="justify">Justify</option>
                    </select>
                  </Field>
                  <Field label="Min Height"><input className={inputClass} placeholder="auto or 48px" value={s.minHeight || ""} onChange={(e) => updateWidget("style", "minHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Width"><input className={inputClass} placeholder="100%" value={s.width || ""} onChange={(e) => updateWidget("style", "width", e.target.value)} /></Field>
                  <Field label="Max Width"><input className={inputClass} placeholder="760px" value={s.maxWidth || ""} onChange={(e) => updateWidget("style", "maxWidth", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Padding"><input className={inputClass} placeholder="0px" value={s.padding || ""} onChange={(e) => updateWidget("style", "padding", e.target.value)} /></Field>
                  <Field label="Margin"><input className={inputClass} placeholder="0px 0px 18px 0px" value={s.margin || ""} onChange={(e) => updateWidget("style", "margin", e.target.value)} /></Field>
                </Row>
                <Field label="Transition Duration"><input className={inputClass} placeholder="0.25s" value={s.transitionDuration || ""} onChange={(e) => updateWidget("style", "transitionDuration", e.target.value)} /></Field>
              </Section>

              <Section title="Border & Container">
                <Row>
                  <Field label="Border Width"><input className={inputClass} placeholder="0px" value={s.border?.width || ""} onChange={(e) => updateBorder("width", e.target.value)} /></Field>
                  <Field label="Border Style">
                    <select className={selectClass} value={s.border?.style || "solid"} onChange={(e) => updateBorder("style", e.target.value)}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Border Color"><input className={inputClass} type="color" value={s.border?.color || "#e5e7eb"} onChange={(e) => updateBorder("color", e.target.value)} /></Field>
                  <Field label="Border Radius"><input className={inputClass} placeholder="0px" value={s.border?.radius || ""} onChange={(e) => updateBorder("radius", e.target.value)} /></Field>
                </Row>
              </Section>
            </>
          )}

          {isButton && (
            <>
              <Section title="Typography">
                <Row>
                  <Field label="Font Size"><input className={inputClass} placeholder="16px" value={s.typography?.fontSize || ""} onChange={(e) => updateTypography("fontSize", e.target.value)} /></Field>
                  <Field label="Font Weight"><input className={inputClass} placeholder="600" value={s.typography?.fontWeight || ""} onChange={(e) => updateTypography("fontWeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Font Family"><input className={inputClass} placeholder="inherit" value={s.typography?.fontFamily || ""} onChange={(e) => updateTypography("fontFamily", e.target.value)} /></Field>
                  <Field label="Line Height"><input className={inputClass} placeholder="1" value={s.typography?.lineHeight || ""} onChange={(e) => updateTypography("lineHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Letter Spacing"><input className={inputClass} placeholder="0px" value={s.typography?.letterSpacing || ""} onChange={(e) => updateTypography("letterSpacing", e.target.value)} /></Field>
                  <Field label="Text Transform">
                    <select className={selectClass} value={s.typography?.textTransform || "none"} onChange={(e) => updateTypography("textTransform", e.target.value)}>
                      <option value="none">None</option>
                      <option value="uppercase">Uppercase</option>
                      <option value="lowercase">Lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </Field>
                </Row>
              </Section>

              <Section title="Normal State">
                <Field label="Background CSS"><input className={inputClass} placeholder="linear-gradient(...) or #2563eb" value={s.background || ""} onChange={(e) => updateWidget("style", "background", e.target.value)} /></Field>
                <Row>
                  <Field label="Text Color"><input className={inputClass} type="color" value={s.textColor || "#ffffff"} onChange={(e) => updateWidget("style", "textColor", e.target.value)} /></Field>
                  <Field label="Border Color"><input className={inputClass} type="color" value={s.border?.color || "#2563eb"} onChange={(e) => updateBorder("color", e.target.value)} /></Field>
                </Row>
                <Field label="Box Shadow"><input className={inputClass} placeholder="0 10px 25px rgba(37, 99, 235, 0.22)" value={s.boxShadow || ""} onChange={(e) => updateWidget("style", "boxShadow", e.target.value)} /></Field>
                <Field label="Text Shadow"><input className={inputClass} placeholder="none" value={s.textShadow || ""} onChange={(e) => updateWidget("style", "textShadow", e.target.value)} /></Field>
              </Section>
              <Section title="Hover State">
                <Field label="Hover Background CSS"><input className={inputClass} placeholder="linear-gradient(...) or #1d4ed8" value={s.hover?.background || ""} onChange={(e) => updateHover("background", e.target.value)} /></Field>
                <Row>
                  <Field label="Hover Text Color"><input className={inputClass} type="color" value={s.hover?.textColor || "#ffffff"} onChange={(e) => updateHover("textColor", e.target.value)} /></Field>
                  <Field label="Hover Border Color"><input className={inputClass} type="color" value={s.hover?.borderColor || s.border?.color || "#2563eb"} onChange={(e) => updateHover("borderColor", e.target.value)} /></Field>
                </Row>
                <Field label="Hover Box Shadow"><input className={inputClass} placeholder="0 16px 35px rgba(...)" value={s.hover?.boxShadow || ""} onChange={(e) => updateHover("boxShadow", e.target.value)} /></Field>
                <Row>
                  <Field label="Lift / Translate Y"><input className={inputClass} placeholder="-2px" value={s.hover?.translateY || ""} onChange={(e) => updateHover("translateY", e.target.value)} /></Field>
                  <Field label="Transition Duration"><input className={inputClass} placeholder="0.25s" value={s.transitionDuration || ""} onChange={(e) => updateWidget("style", "transitionDuration", e.target.value)} /></Field>
                </Row>
              </Section>

              <Section title="Border & Radius">
                <Row>
                  <Field label="Border Width"><input className={inputClass} placeholder="1px" value={s.border?.width || ""} onChange={(e) => updateBorder("width", e.target.value)} /></Field>
                  <Field label="Border Style">
                    <select className={selectClass} value={s.border?.style || "solid"} onChange={(e) => updateBorder("style", e.target.value)}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                </Row>
                <Field label="Border Radius"><input className={inputClass} placeholder="999px" value={s.border?.radius || ""} onChange={(e) => updateBorder("radius", e.target.value)} /></Field>
              </Section>

              <Section title="Spacing & Width">
                <Row>
                  <Field label="Padding"><input className={inputClass} placeholder="14px 28px" value={s.padding || ""} onChange={(e) => updateWidget("style", "padding", e.target.value)} /></Field>
                  <Field label="Margin"><input className={inputClass} placeholder="0px" value={s.margin || ""} onChange={(e) => updateWidget("style", "margin", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Width"><input className={inputClass} placeholder="auto or 260px" value={s.width || ""} onChange={(e) => updateWidget("style", "width", e.target.value)} /></Field>
                  <Field label="Min Width"><input className={inputClass} placeholder="160px" value={s.minWidth || ""} onChange={(e) => updateWidget("style", "minWidth", e.target.value)} /></Field>
                </Row>
              </Section>
            </>
          )}

          {isImage && (
            <>
              <Section title="Layout">
                <Row>
                  <Field label="Alignment">
                    <select className={selectClass} value={s.alignment || "left"} onChange={(e) => updateWidget("style", "alignment", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </Field>
                  <Field label="Aspect Ratio"><input className={inputClass} placeholder="16 / 9" value={s.aspectRatio || ""} onChange={(e) => updateWidget("style", "aspectRatio", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Width"><input className={inputClass} placeholder="100%" value={s.width || ""} onChange={(e) => updateWidget("style", "width", e.target.value)} /></Field>
                  <Field label="Max Width"><input className={inputClass} placeholder="720px" value={s.maxWidth || ""} onChange={(e) => updateWidget("style", "maxWidth", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Height"><input className={inputClass} placeholder="auto or 420px" value={s.height || ""} onChange={(e) => updateWidget("style", "height", e.target.value)} /></Field>
                  <Field label="Min Height"><input className={inputClass} placeholder="auto or 240px" value={s.minHeight || ""} onChange={(e) => updateWidget("style", "minHeight", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Object Fit">
                    <select className={selectClass} value={s.objectFit || "cover"} onChange={(e) => updateWidget("style", "objectFit", e.target.value)}>
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                      <option value="fill">Fill</option>
                      <option value="none">None</option>
                      <option value="scale-down">Scale Down</option>
                    </select>
                  </Field>
                  <Field label="Object Position"><input className={inputClass} placeholder="center center" value={s.objectPosition || ""} onChange={(e) => updateWidget("style", "objectPosition", e.target.value)} /></Field>
                </Row>
              </Section>

              <Section title="Frame & Effects">
                <Row>
                  <Field label="Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.opacity ?? 1} onChange={(e) => updateWidget("style", "opacity", Number(e.target.value))} /></Field>
                  <Field label="Transition Duration"><input className={inputClass} placeholder="0.3s" value={s.transitionDuration || ""} onChange={(e) => updateWidget("style", "transitionDuration", e.target.value)} /></Field>
                </Row>
                <Field label="Background CSS"><input className={inputClass} placeholder="transparent" value={s.background || ""} onChange={(e) => updateWidget("style", "background", e.target.value)} /></Field>
                <Field label="CSS Filter"><input className={inputClass} placeholder="none or grayscale(100%)" value={s.filter || ""} onChange={(e) => updateWidget("style", "filter", e.target.value)} /></Field>
                <Field label="Box Shadow"><input className={inputClass} placeholder="0 18px 40px rgba(15, 23, 42, 0.14)" value={s.boxShadow || ""} onChange={(e) => updateWidget("style", "boxShadow", e.target.value)} /></Field>
              </Section>

              <Section title="Overlay">
                <Row>
                  <Field label="Overlay Color"><input className={inputClass} placeholder="rgba(15, 23, 42, 0.2) or #000000" value={s.overlay?.color || ""} onChange={(e) => updateWidget("style", "overlay", { ...(s.overlay || {}), color: e.target.value })} /></Field>
                  <Field label="Overlay Opacity"><input className={inputClass} type="number" step="0.05" min="0" max="1" value={s.overlay?.opacity ?? 0} onChange={(e) => updateWidget("style", "overlay", { ...(s.overlay || {}), opacity: Number(e.target.value) })} /></Field>
                </Row>
              </Section>

              <Section title="Hover State">
                <Row>
                  <Field label="Hover Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.hover?.opacity ?? 1} onChange={(e) => updateHover("opacity", Number(e.target.value))} /></Field>
                  <Field label="Hover Scale"><input className={inputClass} placeholder="1.02" value={s.hover?.scale || ""} onChange={(e) => updateHover("scale", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Hover Rotate"><input className={inputClass} placeholder="0deg" value={s.hover?.rotate || ""} onChange={(e) => updateHover("rotate", e.target.value)} /></Field>
                  <Field label="Hover Overlay Opacity"><input className={inputClass} type="number" step="0.05" min="0" max="1" value={s.hover?.overlayOpacity ?? 0} onChange={(e) => updateHover("overlayOpacity", Number(e.target.value))} /></Field>
                </Row>
                <Field label="Hover Filter"><input className={inputClass} placeholder="none or brightness(0.9)" value={s.hover?.filter || ""} onChange={(e) => updateHover("filter", e.target.value)} /></Field>
                <Field label="Hover Shadow"><input className={inputClass} placeholder="0 24px 50px rgba(...)" value={s.hover?.boxShadow || ""} onChange={(e) => updateHover("boxShadow", e.target.value)} /></Field>
              </Section>

              <Section title="Border & Spacing">
                <Row>
                  <Field label="Border Width"><input className={inputClass} placeholder="0px" value={s.border?.width || ""} onChange={(e) => updateBorder("width", e.target.value)} /></Field>
                  <Field label="Border Style">
                    <select className={selectClass} value={s.border?.style || "solid"} onChange={(e) => updateBorder("style", e.target.value)}>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="none">None</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Border Color"><input className={inputClass} type="color" value={s.border?.color || "#e5e7eb"} onChange={(e) => updateBorder("color", e.target.value)} /></Field>
                  <Field label="Border Radius"><input className={inputClass} placeholder="24px" value={s.border?.radius || ""} onChange={(e) => updateBorder("radius", e.target.value)} /></Field>
                </Row>
                <Row>
                  <Field label="Padding"><input className={inputClass} placeholder="0px" value={s.padding || ""} onChange={(e) => updateWidget("style", "padding", e.target.value)} /></Field>
                  <Field label="Margin"><input className={inputClass} placeholder="0px" value={s.margin || ""} onChange={(e) => updateWidget("style", "margin", e.target.value)} /></Field>
                </Row>
              </Section>

              <Section title="Caption Style">
                <Row>
                  <Field label="Caption Color"><input className={inputClass} type="color" value={s.caption?.color || "#6b7280"} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), color: e.target.value })} /></Field>
                  <Field label="Caption Align">
                    <select className={selectClass} value={s.caption?.align || "left"} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), align: e.target.value })}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </Field>
                </Row>
                <Row>
                  <Field label="Caption Font Size"><input className={inputClass} placeholder="14px" value={s.caption?.fontSize || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), fontSize: e.target.value })} /></Field>
                  <Field label="Caption Weight"><input className={inputClass} placeholder="400" value={s.caption?.fontWeight || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), fontWeight: e.target.value })} /></Field>
                </Row>
                <Row>
                  <Field label="Caption Line Height"><input className={inputClass} placeholder="1.6" value={s.caption?.lineHeight || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), lineHeight: e.target.value })} /></Field>
                  <Field label="Caption Spacing"><input className={inputClass} placeholder="12px" value={s.caption?.spacing || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), spacing: e.target.value })} /></Field>
                </Row>
                <Row>
                  <Field label="Caption Background"><input className={inputClass} placeholder="transparent" value={s.caption?.background || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), background: e.target.value })} /></Field>
                  <Field label="Caption Padding"><input className={inputClass} placeholder="0px" value={s.caption?.padding || ""} onChange={(e) => updateWidget("style", "caption", { ...(s.caption || {}), padding: e.target.value })} /></Field>
                </Row>
              </Section>
            </>
          )}

          {isSeparator && (
            <>
              <Section title="Line Style">
                <Row>
                  <Field label="Alignment">
                    <select className={selectClass} value={s.alignment || "center"} onChange={(e) => updateWidget("style", "alignment", e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </Field>
                  <Field label="Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.opacity ?? 1} onChange={(e) => updateWidget("style", "opacity", Number(e.target.value))} /></Field>
                </Row>
                <Row>
                  <Field label="Line Color"><input className={inputClass} type="color" value={s.color || "#d1d5db"} onChange={(e) => updateWidget("style", "color", e.target.value)} /></Field>
                  <Field label="Radius"><input className={inputClass} placeholder="999px" value={s.radius || ""} onChange={(e) => updateWidget("style", "radius", e.target.value)} /></Field>
                </Row>
                <Field label="Box Shadow"><input className={inputClass} placeholder="none" value={s.boxShadow || ""} onChange={(e) => updateWidget("style", "boxShadow", e.target.value)} /></Field>
              </Section>

              <Section title="Spacing">
                <Row>
                  <Field label="Padding"><input className={inputClass} placeholder="14px 0px" value={s.padding || ""} onChange={(e) => updateWidget("style", "padding", e.target.value)} /></Field>
                  <Field label="Margin"><input className={inputClass} placeholder="0px" value={s.margin || ""} onChange={(e) => updateWidget("style", "margin", e.target.value)} /></Field>
                </Row>
              </Section>

              <Section title="Label Style">
                <Row>
                  <Field label="Label Color"><input className={inputClass} type="color" value={s.label?.color || "#6b7280"} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), color: e.target.value })} /></Field>
                  <Field label="Label Background"><input className={inputClass} placeholder="#ffffff or transparent" value={s.label?.background || ""} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), background: e.target.value })} /></Field>
                </Row>
                <Row>
                  <Field label="Font Size"><input className={inputClass} placeholder="12px" value={s.label?.fontSize || ""} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), fontSize: e.target.value })} /></Field>
                  <Field label="Font Weight"><input className={inputClass} placeholder="600" value={s.label?.fontWeight || ""} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), fontWeight: e.target.value })} /></Field>
                </Row>
                <Row>
                  <Field label="Letter Spacing"><input className={inputClass} placeholder="0.24em" value={s.label?.letterSpacing || ""} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), letterSpacing: e.target.value })} /></Field>
                  <Field label="Text Transform">
                    <select className={selectClass} value={s.label?.textTransform || "uppercase"} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), textTransform: e.target.value })}>
                      <option value="uppercase">Uppercase</option>
                      <option value="none">None</option>
                      <option value="lowercase">Lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </Field>
                </Row>
                <Field label="Label Padding"><input className={inputClass} placeholder="0px 12px" value={s.label?.padding || ""} onChange={(e) => updateWidget("style", "label", { ...(s.label || {}), padding: e.target.value })} /></Field>
              </Section>
            </>
          )}

          {isHero && (
            <Section title="Hero Style">
              <Field label="Height"><input className={inputClass} placeholder="70vh" value={s.height || ""} onChange={(e) => updateHeroStyle("height", e.target.value)} /></Field>
              <Field label="Padding"><input className={inputClass} placeholder="80px 20px" value={s.padding || ""} onChange={(e) => updateHeroStyle("padding", e.target.value)} /></Field>
              <Row>
                <Field label="Overlay Color"><input className={inputClass} type="color" value={s.overlayColor || "#000000"} onChange={(e) => updateHeroStyle("overlayColor", e.target.value)} /></Field>
                <Field label="Overlay Opacity"><input className={inputClass} type="number" step="0.1" min="0" max="1" value={s.overlayOpacity ?? ""} onChange={(e) => updateHeroStyle("overlayOpacity", Number(e.target.value))} /></Field>
              </Row>
            </Section>
          )}
        </div>
      )}
    </div>
  );
}


