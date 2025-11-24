import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
}

function Slider({ 
  className, 
  value = [0], 
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  ...props 
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [parseFloat(e.target.value)]
    onValueChange?.(newValue)
  }

  return (
    <input
      type="range"
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={cn(
        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
        "accent-orange-500",
        "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
        "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md",
        className
      )}
      {...props}
    />
  )
}

export { Slider }



