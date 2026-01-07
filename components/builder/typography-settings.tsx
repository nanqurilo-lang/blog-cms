"use client"
import { useBuilderStyles } from "../builder/builder-style-context"

export default function TypographySettings() {
  const { styles, setStyles } = useBuilderStyles()

  return (
    <div className="space-y-3">
      <label>Font Family</label>
      <input
        value={styles.fontFamily}
        onChange={(e) =>
          setStyles({ ...styles, fontFamily: e.target.value })
        }
      />

      <label>Base Font Size</label>
      <input
        value={styles.fontSize}
        onChange={(e) =>
          setStyles({ ...styles, fontSize: e.target.value })
        }
      />

      <label>Text Color</label>
      <input
        type="color"
        value={styles.textColor}
        onChange={(e) =>
          setStyles({ ...styles, textColor: e.target.value })
        }
      />
    </div>
  )
}
