import { Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Step {
  label: string
  icon: LucideIcon
}

interface StepProgressProps {
  steps: Step[]
  current: number // 0-indexed
}

export default function StepProgress({ steps, current }: StepProgressProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current

        return (
          <div key={step.label} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done
                    ? "bg-electric-violet border-electric-violet"
                    : active
                    ? "bg-electric-violet/15 border-electric-violet"
                    : "bg-white/5 border-white/15"
                }`}
              >
                {done ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <step.icon
                    className={`w-4 h-4 ${active ? "text-electric-violet" : "text-white/30"}`}
                  />
                )}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  active ? "text-white" : done ? "text-electric-violet" : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mx-3 mb-5 transition-all duration-500">
                <div
                  className={`h-full transition-all duration-500 ${
                    done ? "bg-electric-violet" : "bg-white/10"
                  }`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
