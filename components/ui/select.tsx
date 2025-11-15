"use client"

import { ChevronDown } from "lucide-react"

interface SelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
  required?: boolean
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
}: SelectInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1 ">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full  border border-gray-300 text-gray-900 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-orange-500  cursor-pointer focus:border-transparent appearance-none"
          required={required}
        >
          <option className="cursor-pointer" value="">{placeholder}</option>
          {options.map((opt) => (
            <option className="cursor-pointer" key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}
