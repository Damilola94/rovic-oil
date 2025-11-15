"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import useGetQuery from "@/hooks/useGetQuery";
import handleFetch from "@/services/api/handleFetch";
import { SearchableSelectInput } from "@/components/ui/searchable-selectInput";
import { SelectInput } from "@/components/ui/select";

interface Customer {
  label: string;
  value: string;
}

export default function SendMessagePage() {
  const router = useRouter();

  // form state
  const [toOption, setToOption] = useState<string>("");
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  // fetch companies/customers
  const { data: companiesData, isLoading: isCompaniesLoading } = useGetQuery({
    endpoint: "customers",
    queryKey: ["customers"],
    auth: true,
  });

  const companies: Customer[] =
    companiesData?.items?.map((c: any) => ({ label: c.name, value: c.id })) || [];

  // helper: add selected customer to chips
  const handleCustomerSelect = (id: string) => {
    const found = companies.find((c) => c.value === id);
    if (!found) return;
    if (selectedCustomers.some((s) => s.value === found.value)) return;
    setSelectedCustomers((prev) => [...prev, found]);
  };

  const removeCustomer = (id: string) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.value !== id));
  };

  // create prospect mutation (prospects/bulk) - used AFTER successful communication when option = New Phone Number
  const createProspectMutation = useMutation(handleFetch, {
    onSuccess: () => {
      // silent success or optional toast
      // toast.success("Prospect added");
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to create prospect(s).");
    },
  });

  // send communication mutation
  const sendCommunicationMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Communication sent successfully");
      setSubmitted(true);
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to send communication");
    },
  });

  // helper to call prospects/bulk AFTER sending communication
  const createProspect = async (phone: string) => {
    if (!phone) return;
    const prospects = [
      {
        name: "New Prospect",
        phoneNumber: phone,
      },
    ];

    return new Promise<void>((resolve, reject) => {
      createProspectMutation.mutate(
        {
          endpoint: "prospects/bulk",
          method: "POST",
          body: { data: { prospects } },
          auth: true,
        },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        }
      );
    });
  };

  const buildTargetValue = (option: string) => {
    switch (option) {
      case "All Customers":
        return "AllCustomers";
      case "Selected Customers":
        return "SelectedCustomers";
      case "New Phone Number":
        return "NewPhoneNumbers";
      case "Prospective Customers":
        return "Prospects";
      default:
        return "AllCustomers";
    }
  };

  // main submit: send communication first, THEN (Option B) create prospect if needed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (
      (toOption === "Selected Customers" && selectedCustomers.length === 0) ||
      (toOption === "New Phone Number" && !phoneNumber.trim()) ||
      !message.trim() ||
      !toOption
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // build payload
    const payload = {
      communication: {
        // for now we send SMS messages — adapt if you need Email for some targets
        type: "SMS",
        target: buildTargetValue(toOption),
        message,
        selectedCustomerIds:
          toOption === "Selected Customers" ? selectedCustomers.map((c) => c.value) : [],
        newPhoneNumbers: toOption === "New Phone Number" ? [phoneNumber] : [],
      },
    };

    try {
      // send communication (await so we can create prospect afterwards)
      await new Promise<void>((resolve, reject) => {
        sendCommunicationMutation.mutate(
          {
            endpoint: "communications",
            method: "POST",
            body: payload,
            auth: true,
          },
          {
            onSuccess: () => resolve(),
            onError: (err) => reject(err),
          }
        );
      });

      // Option B: AFTER sending communication, create prospect if New Phone Number selected
      if (toOption === "New Phone Number") {
        try {
          await createProspect(phoneNumber);
          // optionally notify user
          toast.success("New phone number saved as prospect.");
        } catch (err) {
          // prospect creation failed — we show an error but do not roll back communication
          console.error("Failed creating prospect after sending communication:", err);
          toast.error("Communication sent but failed to save prospect.");
        }
      }
    } catch (err) {
      // send communication failed — handled by mutation onError, nothing further
      console.error("Communication send failed:", err);
    }
  };

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Send Message">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="rounded-full flex items-center justify-center mx-auto mb-6">
            <Image src="/svg/success.svg" alt="Success" width={100} height={100} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Message Sent successfully</h2>
          <Button
            onClick={() => router.push("/communications")}
            className="text-accent flex hover:text-accent/80 bg-transparent border-0 p-0 text-center mx-auto"
          >
            <ChevronLeft size={20} /> Back to Communications
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // UI
  return (
    <DashboardLayout pageTitle="Send Message">
      <Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2">
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/svg/message.svg" alt="Message" width={30} height={30} />
            <h2 className="text-xl font-semibold text-foreground">Send Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <SelectInput
              label="To"
              value={toOption}
              onChange={(v) => setToOption(v)}
              options={[
                { label: "All Customers", value: "All Customers" },
                { label: "Select Customers", value: "Selected Customers" },
                { label: "New Phone Number", value: "New Phone Number" },
                { label: "Prospective Customers", value: "Prospective Customers" },
              ]}
              placeholder="Select option"
            />

            {toOption === "Selected Customers" && (
              <>
                <SearchableSelectInput
                  label="Select Customer"
                  value=""
                  onChange={(v) => handleCustomerSelect(v)}
                  onChangeVal={() => {}}
                  options={companies}
                  placeholder={isCompaniesLoading ? "Loading customers..." : "Search or select a customer"}
                />
                {selectedCustomers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCustomers.map((c) => (
                      <div
                        key={c.value}
                        className="bg-accent/10 border border-accent text-accent px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                      >
                        {c.label}
                        <button
                          type="button"
                          onClick={() => removeCustomer(c.value)}
                          className="hover:text-accent/80 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {toOption === "New Phone Number" && (
              <Input
                label="Phone Number"
                type="text"
                maxLength={11}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sendCommunicationMutation.isLoading || createProspectMutation.isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg mt-8"
            >
              {sendCommunicationMutation.isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
