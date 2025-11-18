"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import useGetQuery from "@/hooks/useGetQuery";
import useDownloadPdf from "@/hooks/useDownloadPdf";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import handleFetch from "@/services/api/handleFetch";

export default function PreviewQuotationPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading, isError } = useGetQuery({
    endpoint: `communications/${id}`,
    queryKey: ["communication", id],
    auth: true,
  });

  const quotationData = data?.quotationDetails;
  const [isSending, setIsSending] = useState(false);

  const { generatePdfBlob, downloadPdf, loading: downloadLoading } = useDownloadPdf();

  const uploadMutation = useMutation(handleFetch, {
    onSuccess: () => {
      sendMutation.mutate({
        endpoint: `communications/quotations/${id}/send`,
        method: "POST",
        auth: true,
      });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to upload quotation PDF.");
      setIsSending(false);
    },
  });

  const sendMutation = useMutation(handleFetch, {
    onSuccess: () => {
      toast.success("Quotation sent successfully!");
      router.push("/communications/send-quotation/success");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to send quotation.");
    },
    onSettled: () => setIsSending(false),
  });

  const handleSendQuotation = async () => {
    try {
      setIsSending(true);
      const blob = await generatePdfBlob({
        elementId: "quotation-content",
      });

      if (!blob) {
        toast.error("Failed to generate PDF.");
        setIsSending(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", blob, `Quotation-${id}.pdf`);

      uploadMutation.mutate({
        endpoint: `communications/quotations/${id}/upload-pdf`,
        method: "POST",
        auth: true,
        multipart: true,
        body: formData,
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF.");
      setIsSending(false);
    }
  };


  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Preview Quotation">
        <div className="min-h-screen flex items-center justify-center">
          Loading quotation...
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !quotationData) {
    return (
      <DashboardLayout pageTitle="Preview Quotation">
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Failed to load quotation.
        </div>
      </DashboardLayout>
    );
  }

  const totalAmount = Number(quotationData.totalAmount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <DashboardLayout pageTitle="Preview Quotation">
      <div>
        <Button
          onClick={() => router.push("/communications")}
          variant="ghost"
          size="sm"
          className="gap-2 mt-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>

        <div className="a4-preview">
          <div
            id="quotation-content"
            className="rounded-lg border p-6 sm:p-10 mx-auto"
            style={{
              width: "794px",
              maxWidth: "100%",
              backgroundColor: "white",
              color: "rgb(17,17,17)",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-start pb-6 border-b border-gray-300 gap-4 mb-6">
              <Image
                src="/logo/rovic-logo.png"
                alt="Rovic Oil & Gas Logo"
                width={180}
                height={60}
                className="mx-auto sm:mx-0"
              />
              <div className="text-right text-sm mt-10" style={{ color: "rgb(80,80,80)" }}>
                <p className="font-semibold" style={{ color: "rgb(20,20,20)" }}>
                  OFFICE ADDRESS
                </p>
                <p>Road 116, House 8, Gwarimpa, Abuja, Nigeria</p>
                <p>Tel: +234 703 331 9394, +234 805 535 7592</p>
              </div>
            </div>

            <h1 className="text-center font-bold mb-4" style={{ fontSize: "18px" }}>
              QUOTATION FOR THE SUPPLY OF {quotationData.quantity} LITERS OF DIESEL
            </h1>

            <p className="mb-6 leading-relaxed text-sm" style={{ color: "rgb(60,60,60)" }}>
              {quotationData.description}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full mb-6 border-collapse" style={{ minWidth: "700px" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgb(30,30,30)", color: "white" }}>
                    <th className="border px-3 py-2 text-left text-sm">S/N</th>
                    <th className="border px-3 py-2 text-left text-sm">DESCRIPTION</th>
                    <th className="border px-3 py-2 text-left text-sm">DENSITY</th>
                    <th className="border px-3 py-2 text-center text-sm">QTY</th>
                    <th className="border px-3 py-2 text-right text-sm">PRICE</th>
                    <th className="border px-3 py-2 text-right text-sm">AMOUNT</th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={{ color: "rgb(30,30,30)" }}>
                    <td className="border px-3 py-2 text-sm">1</td>
                    <td className="border px-3 py-2 text-sm">{quotationData.description}</td>
                    <td className="border px-3 py-2 text-sm">{quotationData.density}</td>
                    <td className="border px-3 py-2 text-center text-sm">
                      {quotationData.quantity}
                    </td>
                    <td className="border px-3 py-2 text-right text-sm">
                      ₦{Number(quotationData.price).toLocaleString()}
                    </td>
                    <td className="border px-3 py-2 text-right text-sm">₦{totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-40 sm:w-64 text-sm">
                <div
                  className="flex justify-between border-t-2 pt-2"
                  style={{ borderColor: "rgb(20,20,20)" }}
                >
                  <span className="font-semibold">GRAND TOTAL</span>
                  <span className="font-semibold">₦{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-3" style={{ color: "rgb(60,60,60)" }}>
              <p>
                <span className="font-semibold" style={{ color: "rgb(20,20,20)" }}>
                  Validity Period:
                </span>{" "}
                30 days
              </p>

              <div>
                <p className="font-semibold mb-2" style={{ color: "rgb(20,20,20)" }}>
                  Warranty:
                </p>

                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>This quote is exclusive of TAXES</li>
                  <li>We supply lubricants/engine oil at competitive prices</li>
                  <li>We offer contract financing options</li>
                  <li>₦20,000 referral commission on new business</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Button
              size="lg"
              onClick={() =>
                downloadPdf({
                  elementId: "quotation-content",
                  filename: `Quotation-${id}.pdf`,
                })
              }
              disabled={downloadLoading}
            >
              {downloadLoading ? "Generating PDF..." : "Download PDF"}
            </Button>

            <Button
              size="lg"
              onClick={handleSendQuotation}
              disabled={isSending}
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              {isSending ? "Sending..." : "Send Quotation"}
            </Button>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
