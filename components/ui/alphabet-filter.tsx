"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AlphabetFilterProps {
  className?: string,
  onSelect: (letter: string | null) => void
}

export function AlphabetFilter({ onSelect, className }: AlphabetFilterProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)) 

  const handleSelect = (letter: string) => {
    const newSelection = letter === selectedLetter ? null : letter
    setSelectedLetter(newSelection)
    onSelect(newSelection)
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-1 py-4 px-2 h-full mt-15 + ${className}`}>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleSelect(letter)}
          className={cn(
            "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-md transition-colors cursor-pointer",
            selectedLetter === letter
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}
