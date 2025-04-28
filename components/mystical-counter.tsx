interface MysticalCounterProps {
  label: string
  value: string
  color: string
}

export default function MysticalCounter({ label, value, color }: MysticalCounterProps) {
  return (
    <div className="relative">
      {/* Border with animated glow */}
      <div
        className={`absolute inset-0 border-2 border-white/50 animate-border-pulse rounded-pixel`}
        style={{
          boxShadow: `0 0 10px ${color}40, inset 0 0 5px ${color}30`,
          animationDuration: "3s",
        }}
      ></div>

      {/* Content */}
      <div className="px-6 py-3 relative">
        <div className="font-heading text-xs" style={{ color }}>
          {label}
        </div>
        <div className="text-xl font-pixel text-white">{value}</div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: color }}></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: color }}></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: color }}></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: color }}></div>
    </div>
  )
}
