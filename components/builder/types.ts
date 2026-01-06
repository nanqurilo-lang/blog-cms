export type WidgetType =
  | "button"
  | "heading"
  | "text"
  | "image"
  | "section"

  export interface BaseWidget<TProps = any> {
  id: string
  type: WidgetType
  props: TProps
}

export interface ButtonProps {
  /* -------- GENERAL -------- */
  text: string
  link: string

  /* -------- STYLE -------- */
  bgColor: string
  textColor: string
  padding: string
  borderRadius: string
}


export type ButtonWidget = BaseWidget<ButtonProps> & {
  type: "button"
}


export interface HeadingProps {
  text: string
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  color: string
  align: "left" | "center" | "right"
}


export type HeadingWidgetType = BaseWidget<HeadingProps> & {
  type: "heading"
}



// export type BuilderElement =
//   | ButtonWidget
//   | HeadingWidget



  export const createButtonWidget = (): ButtonWidget => ({
  id: crypto.randomUUID(),
  type: "button",
  props: {
    text: "Click Me",
    link: "#",
    bgColor: "#2563eb",
    textColor: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
  },
})




/* ---------- TEXT ---------- */
export interface TextProps {
  text: string
  color: string
  fontSize: string
}

export type TextWidgetType = BaseWidget<TextProps> & {
  type: "text"
}


/* ---------- IMAGE ---------- */
export interface ImageProps {
  src: string
  width: string
  borderRadius: string
}

export type ImageWidgetType = BaseWidget<ImageProps> & {
  type: "image"
}

/* ---------- UNION UPDATE ---------- */
export type BuilderElement =
  | ButtonWidget
  | HeadingWidgetType
  | TextWidgetType
  | ImageWidgetType




// setElements((prev) => [...prev, createButtonWidget()])


