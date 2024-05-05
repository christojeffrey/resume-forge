"use client";

import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Document as PDFViewerDocument,
  Page as PDFViewerPage,
} from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Resume } from "./resume";
import { resumeDataAtom, recomputePreviewAtom } from "@/store";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function ResumePreview({ width }: { width?: number }) {
  // run recompute first time

  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [resumeData] = useAtom(resumeDataAtom);

  const [doRecomputePreview, setDoRecomputePreview] =
    useAtom(recomputePreviewAtom);

  useEffect(() => {
    setDoRecomputePreview(true);
  }, []);

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

  // trigger on page load
  useEffect(() => {
    setDoRecomputePreview(true);
  }, []);

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
    <div className="w-fit">
      {/* pdf preview */}
      <PDFViewerDocument
        file={pdfString}
        onLoadSuccess={onDocumentLoadSuccess}
        className=""
      >
        <PDFViewerPage
          pageNumber={pageNumber}
          className="border-slate-400 border-[1px]"
          width={width}
        />
      </PDFViewerDocument>
      {/* page navigation */}
      <div className="text-center">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>

        <div>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="font-bold mx-2"
          >
            {`<`}
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="font-bold mx-2"
          >
            {`>`}
          </button>
        </div>
        <PDFDownloadLink document={Resume(resumeData)} fileName="resume.pdf">
          {({ blob, url, loading, error }) => "Download"}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
