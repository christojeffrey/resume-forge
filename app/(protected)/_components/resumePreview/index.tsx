"use client";

import { pdf } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Document as PDFViewerDocument,
  Page as PDFViewerPage,
} from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { recomputePreviewAtom, resumeDataAtom } from "../../page";
import { Resume } from "./resume";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function ResumePreview() {
  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [resumeData] = useAtom(resumeDataAtom);

  const [doRecomputePreview, setDoRecomputePreview] =
    useAtom(recomputePreviewAtom);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    const updateBase64String = async () => {
      const blob = await pdf(Resume(resumeData)).toBlob();
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPdfString(base64String);
      };
    };
    if (doRecomputePreview) {
      updateBase64String();
      setDoRecomputePreview(false);
    }
  }, [doRecomputePreview]);

  return (
    <div>
      {/* pdf preview */}
      <PDFViewerDocument file={pdfString} onLoadSuccess={onDocumentLoadSuccess}>
        <PDFViewerPage
          pageNumber={pageNumber}
          className="border-2 border-black testing"
          width={300}
        />
      </PDFViewerDocument>
      {/* page navigation */}
      <div className="border-2 border-black">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
