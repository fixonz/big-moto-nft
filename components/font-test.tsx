"use client"

import { useEffect, useState } from "react"

export default function FontTest() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [fontStatus, setFontStatus] = useState({
    oldGameFatty: false,
    prStart: false,
  })

  useEffect(() => {
    // Check if fonts are loaded
    const checkFonts = async () => {
      try {
        await document.fonts.ready

        // Check if specific fonts are loaded
        const oldGameFattyLoaded = Array.from(document.fonts).some(
          (font) => font.family.includes("OldGameFatty") && font.status === "loaded",
        )

        const prStartLoaded = Array.from(document.fonts).some(
          (font) => font.family.includes("PrStart") && font.status === "loaded",
        )

        setFontStatus({
          oldGameFatty: oldGameFattyLoaded,
          prStart: prStartLoaded,
        })

        setFontsLoaded(oldGameFattyLoaded && prStartLoaded)

        if (!oldGameFattyLoaded) {
          console.error("OldGameFatty font failed to load")
        }

        if (!prStartLoaded) {
          console.error("PrStart font failed to load")
        }
      } catch (error) {
        console.error("Error checking fonts:", error)
      }
    }

    // Check fonts after a short delay to allow them to load
    const timer = setTimeout(checkFonts, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 p-2 text-xs text-white">
      <div>Fonts loaded: {fontsLoaded ? "✅" : "❌"}</div>
      <div>OldGameFatty: {fontStatus.oldGameFatty ? "✅" : "❌"}</div>
      <div>PrStart: {fontStatus.prStart ? "✅" : "❌"}</div>
      <div className="font-pixel mt-1">OldGameFatty Test</div>
      <div className="font-heading mt-1">PrStart Test</div>
    </div>
  )
}
