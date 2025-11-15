"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

interface SearchableSelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  onChangeVal: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
  required?: boolean
}

export function SearchableSelectInput({
  label,
  value,
  onChange,
  onChangeVal, 
  options,
  placeholder = "Select an option",
  required = false,
}: SearchableSelectInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white cursor-pointer focus-within:ring-2 focus-within:ring-orange-500">
          <span>{value || placeholder}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="flex items-center gap-2 p-2 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChangeVal(opt.label)
                    onChange(opt.value)
                    setIsOpen(false)
                    setSearchTerm("")
                  }}
                  className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 transition ${
                    value === opt.value ? "bg-orange-100 text-orange-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <p className="p-3 text-sm text-gray-400 text-center">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
