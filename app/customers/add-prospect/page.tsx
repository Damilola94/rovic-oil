"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"
import { useMutation } from "react-query"
import handleFetch from "@/services/api/handleFetch";
import { toast } from "react-toastify"
import { isValidNigerianNumber } from "@/lib/utils"

export default function AddProspectPage() {
    const router = useRouter()
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
    const [phoneInput, setPhoneInput] = useState("")

    const createProspectMutation = useMutation(handleFetch, {
        onSuccess: (res: any) => {
            toast.success(res?.message || "Prospect(s) added successfully")
            router.push("/customers")
        },
        onError: (err: any) => {
            toast.error(err?.message || "Something went wrong, please try again.")
        },
    })

    const handleAddPhoneNumber = () => {
        if (!phoneInput.trim()) {
            toast.warn("Please enter a phone number.")
            return
        }

        if (!isValidNigerianNumber(phoneInput.trim())) {
            toast.warn("Invalid Nigerian phone number format.")
            return
        }

        if (phoneNumbers.includes(phoneInput.trim())) {
            toast.warn("Phone number already added.")
            return
        }

        setPhoneNumbers([...phoneNumbers, phoneInput.trim()])
        setPhoneInput("")
    }

    const handleRemovePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }

    const handleAddProspect = async () => {
        if (phoneNumbers.length === 0) {
            toast.warn("Please add at least one valid phone number.")
            return
        }

        const prospects = phoneNumbers.map((phone) => ({
            name: "New Prospect",
            phoneNumber: phone,
        }))

        createProspectMutation.mutate({
            endpoint: "prospects/bulk",
            method: "POST",
            body: { data: { prospects } },
            auth: true,
        })
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
                <Button
                    onClick={() => router.back()}
                    variant="ghost" size="sm" className="gap-2">
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </Button>

                <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
                    <div className="w-full max-w-2xl">
                        <div className="flex flex-col items-center gap-6 mb-12">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                <Image
                                    src="/svg/user-add.svg"
                                    alt="Rovic Oil & Gas Logo"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Add Prospect</h1>
                        </div>

                        <div className="mb-8 w-full">
                            <div className="flex items-end gap-3 mb-6 w-full">
                                <div className="flex-1">
                                    <Input
                                        type="tel"
                                        label="Phone Number(s)"
                                        placeholder="Enter Nigerian phone number"
                                        value={phoneInput}
                                        onChange={(e) => setPhoneInput(e.target.value)}
                                        maxLength={11}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <Button
                                    onClick={handleAddPhoneNumber}
                                    className="bg-accent hover:bg-accent/90 text-white px-6 py-5"
                                >
                                    Add
                                </Button>
                            </div>

                            {phoneNumbers.length > 0 && (
                                <div className="grid bg-white p-4 rounded-2xl h-36 overflow-y-scroll grid-cols-4 gap-2">
                                    {phoneNumbers.map((phone, index) => (
                                        <div
                                            key={index}
                                            className="flex h-fit w-fit items-center justify-start gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2"
                                        >
                                            <span className="text-sm text-accent font-medium truncate">
                                                {phone}
                                            </span>
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
                            disabled={phoneNumbers.length === 0 || createProspectMutation.isLoading}
                            size="lg"
                            className="gap-2 bg-accent hover:bg-accent w-full"
                        >
                            {createProspectMutation.isLoading ? "Adding Prospect..." : "Add Prospect"}
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
