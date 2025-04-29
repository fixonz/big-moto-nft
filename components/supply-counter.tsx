import { cn } from "./lib/utils"

interface SupplyCounterProps {
  label: string
  current?: number
  total: number
  className?: string
}

export default function SupplyCounter({ label, current, total, className }: SupplyCounterProps) {
  return (
    <div className={cn("border-2 border-white px-4 py-2", className)}>
      <div className="text-sm text-[#00ffff]">{label}</div>
      <div className="text-xl">
        {current ? `${current}/` : "~"}
        {total}
      </div>
    </div>
  )
}
