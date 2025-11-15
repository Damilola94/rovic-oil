"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import useGetQuery from "@/hooks/useGetQuery";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; 

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
  const [downloadLoading, setDownloadLoading] = useState(false); 

  const prepareForCapture = async () => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  };

const handleDownloadPDF = async () => {
  setDownloadLoading(true);

  try {
    const element = document.getElementById("quotation-content");
    if (!element) throw new Error("Element not found");

    const jsPdf = new jsPDF("p", "pt", "a4");

    const pageWidth = jsPdf.internal.pageSize.getWidth();
    const pageHeight = jsPdf.internal.pageSize.getHeight();

    const totalHeight = element.scrollHeight;
    const viewWidth = element.clientWidth;

    const chunkHeight = 1500; // safe chunk size
    let currentY = 0;

    while (currentY < totalHeight) {
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2,
        scrollY: -currentY,
        width: viewWidth,
        height: chunkHeight,
        windowWidth: viewWidth,
        windowHeight: chunkHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1);
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (currentY === 0) {
        jsPdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        jsPdf.addPage();
        jsPdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      currentY += chunkHeight;
    }

    jsPdf.save(`Quotation-${id}.pdf`);
  } catch (err) {
    console.error("PDF error:", err);
  } finally {
    setDownloadLoading(false);
  }
};


  const handleSendQuotation = () => {
    setIsSending(true);
    setTimeout(() => {
      router.push("/communications/send-quotation/success");
    }, 1000);
  };

  // --------------------------------------------------
  // UI STATE HANDLING
  // --------------------------------------------------
  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Preview Quotation">
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
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

  // --------------------------------------------------
  // MAIN PAGE RETURN
  // --------------------------------------------------
  return (
    <DashboardLayout pageTitle="Preview Quotation">
      <div className="">
        <Button
          onClick={() => router.push("/communications")}
          variant="ghost"
          size="sm"
          className="gap-2 mt-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* PDF CONTENT */}
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
            {/* LOGO + ADDRESS */}
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

            {/* TITLE */}
            <h1 className="text-center font-bold mb-4" style={{ fontSize: "18px" }}>
              QUOTATION FOR THE SUPPLY OF {quotationData.quantity} LITERS OF DIESEL
            </h1>

            {/* DESCRIPTION */}
            <p className="mb-6 leading-relaxed text-sm" style={{ color: "rgb(60,60,60)" }}>
              {quotationData.description}
            </p>

            {/* TABLE */}
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

            {/* TOTAL */}
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

            {/* WARRANTY */}
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

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadPDF}
              disabled={downloadLoading}
              className="border-red-500 text-red-500 hover:bg-red-500 w-full sm:w-auto"
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
