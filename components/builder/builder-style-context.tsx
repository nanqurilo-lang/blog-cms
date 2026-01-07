"use client"
import { createContext, useContext, useState } from "react"

const StyleContext = createContext<any>(null)

export function BuilderStyleProvider({ children }: { children: React.ReactNode }) {
  const [styles, setStyles] = useState({
    fontFamily: "Inter, sans-serif",
    textColor: "#111111",
    fontSize: "16px",
  })

  return (
    <StyleContext.Provider value={{ styles, setStyles }}>
      {children}
    </StyleContext.Provider>
  )
}

export const useBuilderStyles = () => useContext(StyleContext)
