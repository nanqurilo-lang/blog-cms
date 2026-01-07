// import { createImageWidget } from "../builder/types"



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
// export interface TextProps {
//   text: string
//   color: string
//   fontSize: string
// }

// export type TextWidgetType = BaseWidget<TextProps> & {
//   type: "text"
// }


export interface TextProps {
  content: string // HTML
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


export const createHeadingWidget = (): HeadingWidgetType => ({
  id: crypto.randomUUID(),
  type: "heading",
  props: {
    text: "Heading Text",
    level: "h2",
    color: "#000000",
    align: "left",
  },
})


// ================= IMAGE WIDGET FACTORY =================

export const createImageWidget = (): ImageWidgetType => ({
  id: crypto.randomUUID(),
  type: "image",
  props: {
    src: "https://via.placeholder.com/300",
    width: "300px",
    borderRadius: "8px",
  },
})



// ================= TEXT WIDGET FACTORY =================

// export const createTextWidget = (): TextWidgetType => ({
//   id: crypto.randomUUID(),
//   type: "text",
//   props: {
//     text: "This is a text block",
//     color: "#333333",
//     fontSize: "16px",
//   },
// })



export const createTextWidget = (): TextWidgetType => ({
  id: crypto.randomUUID(),
  type: "text",
  props: {
    content: "<p>Type your text here</p>",
  },
})

