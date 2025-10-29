"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"

export default function AddProspectPage() {
    const router = useRouter()
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
    const [phoneInput, setPhoneInput] = useState("")

    const handleAddPhoneNumber = () => {
        if (phoneInput.trim() && !phoneNumbers.includes(phoneInput.trim())) {
            setPhoneNumbers([...phoneNumbers, phoneInput.trim()])
            setPhoneInput("")
        }
    }

    const handleRemovePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }

    const handleAddProspect = () => {
        if (phoneNumbers.length > 0) {
            console.log("Adding prospect with phone numbers:", phoneNumbers)
            router.push("/my-customers")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddPhoneNumber()
        }
    }

    return (
        <DashboardLayout pageTitle="Add Prospect">
            <div className="">
                <Link href="/customers" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </Link>

                <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
                    <div className="w-full max-w-2xl">
                        <div className="flex flex-col items-center gap-6 mb-12">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                <Image
                                    src="/svg/user-add.svg"
                                    alt="Rovic Oil & Gas Logo"
                                    width={30} height={30}
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Add Prospect</h1>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-foreground mb-4">Phone Number(s)</label>

                            <div className="flex gap-2 mb-6">
                                <Input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1"
                                />
                                <Button onClick={handleAddPhoneNumber} className="bg-accent hover:bg-accent/90 text-white px-6">
                                    Add
                                </Button>
                            </div>

                            {phoneNumbers.length > 0 && (
                                <div className="grid bg-white p-4 rounded-2xl h-36  overflow-y-scroll grid-cols-4 gap-3">
                                    {phoneNumbers.map((phone, index) => (
                                        <div
                                            key={index}
                                            className="flex h-fit w-fit items-center justify-start gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2"
                                        >
                                            <span className="text-sm text-accent font-medium truncate">{phone}</span>
                                            <button
                                                onClick={() => handleRemovePhoneNumber(index)}
                                                className="text-accent hover:text-accent/80 transition-colors shrink-0 cursor-pointer"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleAddProspect}
                            disabled={phoneNumbers.length === 0}
                            size='lg'
                            className="gap-2 bg-accent hover:bg-accent w-full"
                        >
                            Add Prospect
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )
}
