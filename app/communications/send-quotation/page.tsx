"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard-layout";
import handleFetch from "@/services/api/handleFetch";

export default function SendQuotationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    description: "",
    density: "",
    quantity: "",
    price: "",
    emailAddress: "",
  });

  const totalAmount =
    formData.quantity && formData.price
      ? (parseFloat(formData.quantity) * parseFloat(formData.price)).toLocaleString(
        "en-NG",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )
      : "0.00";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const quotationMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      toast.success(res?.message || "Quotation sent successfully!");
      router.push(`/communications/send-quotation/preview/${res?.id}`);
    },
    onError: (err: { message: string }) => {
      router.push("/communications/send-quotation/preview");
      toast.error(err?.message || "Failed to send quotation");
    },
  });

  const handleSubmitQuotation = () => {
    if (
      !formData.customerName ||
      !formData.customerAddress ||
      !formData.description ||
      !formData.quantity ||
      !formData.price ||
      !formData.emailAddress
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const body = {
      quotation: {
        customerName: formData.customerName,
        customerAddress: formData.customerAddress,
        description: formData.description,
        density: Number(formData.density) || 0,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        totalAmount: Number(formData.quantity) * Number(formData.price),
        emailAddress: formData.emailAddress,
      },
    };

    quotationMutation.mutate({
      endpoint: "communications",
      extra: "quotations",
      method: "POST",
      body,
      auth: true
    });
  };

  const { isLoading } = quotationMutation;

  return (
    <DashboardLayout pageTitle="Send Quotation">
      <div className="min-h-screen bg-background">
        <Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <Image src="/svg/receipt-item.svg" alt="Quotation" width={30} height={30} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
              Send Quotation
            </h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-2">Customer's Name</label>
                <Input
                  type="text"
                  name="customerName"
                  placeholder="Customer's Name"
                  value={formData.customerName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Customer Address</label>
                <Input
                  type="text"
                  name="customerAddress"
                  placeholder="Enter Address"
                  value={formData.customerAddress}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Density</label>
                <Input
                  type="text"
                  name="density"
                  placeholder="Enter Density"
                  value={formData.density}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  name="emailAddress"
                  placeholder="Customer's Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Total Amount (₦)</label>
                <div className="px-3 py-2 border border-border rounded-md bg-muted">
                  {totalAmount}
                </div>
              </div>
              <Button
                type="button"
                onClick={handleSubmitQuotation}
                className="w-full bg-red-500 hover:bg-red-600 text-white  py-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Send Quotation"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
