"use client";

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useState } from "react";

export default function useDownloadPdf() {
  const [loading, setLoading] = useState(false);

  const downloadPdf = async ({
    elementId,
    filename = "document.pdf",
    orientation = "p",
  }: {
    elementId: string;
    filename?: string;
    orientation?: "p" | "l";
  }) => {
    setLoading(true);

    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error("Element not found");

      const pdf = new jsPDF({
        orientation,
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scale = Math.min(
        pageWidth / canvasWidth,
        pageHeight / canvasHeight
      );

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      const x = (pageWidth - imgWidth) / 2;
      const y = 20;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation error:", err);
    }

    setLoading(false);
  };

  const generatePdfBlob = async ({
    elementId,
    orientation = "p",
  }: {
    elementId: string;
    orientation?: "p" | "l";
  }): Promise<Blob | null> => {
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error("Element not found");

      const pdf = new jsPDF({
        orientation,
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scale = Math.min(
        pageWidth / canvasWidth,
        pageHeight / canvasHeight
      );

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      const x = (pageWidth - imgWidth) / 2;
      const y = 20;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      return pdf.output("blob");
    } catch (err) {
      console.error("PDF Blob generation failed:", err);
      return null;
    }
  };

  return { downloadPdf, generatePdfBlob, loading };
}
