"use client"

import { SetStateAction, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"

interface RefillStockModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (amount: string) => void
}

export function RefillStockModal({ isOpen, onClose, onConfirm }: RefillStockModalProps) {
  const [amount, setAmount] = useState("")

  if (!isOpen) return null

  const handleConfirm = () => {
    if (amount.trim()) {
      onConfirm(amount)
      setAmount("")
    }
  }

  const handleClose = () => {
    setAmount("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Enter New Stock</h2>
          <button onClick={handleClose} className=" hover:cursor-pointer  p-1 hover:bg-muted rounded-lg" >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Search Customer"
            value={amount}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setAmount(e.target.value)}
            className="w-full"
          />
          <Button
            onClick={handleConfirm}
            size="lg"
            disabled={!amount.trim()}
            className="w-full bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Stock
          </Button>
        </div>
      </div>
    </div>
  )
}
