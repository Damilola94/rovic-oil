"use client"

import * as React from "react"
import { forwardRef, useState } from "react"
import { cn, formatMoney } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, onChange, value, ...props }, ref) => {
    const id = React.useId()
    const [internalValue, setInternalValue] = useState(value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value

      if (type === "money") {
        const formatted = formatMoney(rawValue)
        setInternalValue(formatted)
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: formatted,
          },
        } as React.ChangeEvent<HTMLInputElement>)
      } else {
        onChange?.(e)
      }
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type === "money" ? "text" : type}
          value={type === "money" ? internalValue : value}
          onChange={handleChange}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "dark:bg-input/30 border-input h-10 w-full rounded-lg border bg-white px-4 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "border-destructive focus-visible:ring-destructive/30",
            className
          )}
          {...props}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
