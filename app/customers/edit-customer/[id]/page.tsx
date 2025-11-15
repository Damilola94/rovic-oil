"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { SelectInput } from "@/components/ui/select"
import { SearchableSelectInput } from "@/components/ui/searchable-selectInput"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import handleFetch from "@/services/api/handleFetch"
import useGetQuery from "@/hooks/useGetQuery"

export default function EditCustomerPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const params = useParams<{ id: string }>();
  const customerId = params.id;

  const [formData, setFormData] = useState({
    customerType: "",
    name: "",
    location: "",
    phone: "",
    email: "",
    hasParentCompany: "",
    parentCompany: "",
    parentCompanyVal: "",
  })

  const { data: customerData, isLoading: loadingCustomer } = useGetQuery({
    endpoint: `customers/${customerId}`,
    queryKey: ["customer-details", customerId],
    auth: true,
  })

  const { data: parentCompaniesData } = useGetQuery({
    endpoint: "customers",
    queryKey: ["customers"],
    auth: true,
  })

  const parentCompanies =
    parentCompaniesData?.items
      ?.filter((customer: any) => customer.type === "Organization")
      .map((org: any) => ({
        label: org.name,
        value: org.id,
      })) || []

  useEffect(() => {
    if (customerData) {
      setFormData({
        customerType: customerData?.type || "",
        name: customerData?.name || "",
        location: customerData?.address || "",
        phone: customerData?.phone || "",
        email: customerData?.email || "",
        hasParentCompany: customerData?.hasParentCompany ? "Yes" : "No",
        parentCompany: customerData?.parentCompanyId || "",
        parentCompanyVal: customerData?.parentCompanyId || "",
      })
    }
  }, [customerData])

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const editCustomerMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Customer updated successfully")
      setSubmitted(true)
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to update customer, please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.customerType ||
      !formData.name ||
      !formData.location ||
      !formData.phone ||
      !formData.email
    ) {
      toast.error("Please fill in all required fields.")
      return
    }

    const body = {
      type: formData.customerType,
      name: formData.name,
      address: formData.location,
      phone: formData.phone,
      email: formData.email,
      hasParentCompany: formData.hasParentCompany === "Yes",
      parentCompanyId:
        formData.hasParentCompany === "Yes" ? formData.parentCompany : null,
    }

    editCustomerMutation.mutate({
      endpoint: `customers/${customerId}`,
      method: "PUT",
      body,
      auth: true,
    })
  }

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Edit Customer">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-accent/10">
            <CheckCircle2 size={64} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Customer updated successfully
          </h2>
          <button
            onClick={() => router.push("/customers")}
            className="text-accent hover:text-accent/80 font-medium cursor-pointer"
          >
            ← Back to my customers
          </button>
        </div>
      </DashboardLayout>
    )
  }

  if (loadingCustomer) {
    return (
      <DashboardLayout pageTitle="Edit Customer">
        <div className="flex items-center justify-center min-h-[500px]">
          <p className="text-slate-500">Loading customer data...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Edit Customer">
      <Button
        onClick={() => router.back()}
        variant="ghost" size="sm" className="gap-2">
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 space-y-6">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <Image src="/svg/user-add.svg" alt="Edit" width={30} height={30} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Customer Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectInput
            label="Type of Customer"
            value={formData.customerType}
            onChange={(v) => handleInputChange("customerType", v)}
            options={[
              { label: "Individual", value: "Individual" },
              { label: "Organization", value: "Organization" },
            ]}
          />

          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <SelectInput
            label="Is there a parent company?"
            value={formData.hasParentCompany}
            onChange={(v) => handleInputChange("hasParentCompany", v)}
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
          />

          {formData.hasParentCompany === "Yes" && (
            <SearchableSelectInput
              label="Select parent company affiliation"
              value={formData.parentCompanyVal}
              onChange={(v) => handleInputChange("parentCompany", v)}
              onChangeVal={(v) => handleInputChange("parentCompanyVal", v)}
              options={parentCompanies}
              placeholder="Search or select a company"
              required
            />
          )}

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-5 rounded-lg mt-8"
            disabled={editCustomerMutation.isLoading}
          >
            {editCustomerMutation.isLoading ? "Updating..." : "Update Customer"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
