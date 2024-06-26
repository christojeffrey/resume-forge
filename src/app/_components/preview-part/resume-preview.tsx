"use client";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  Document as PDFViewerDocument,
  Page as PDFViewerPage,
} from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Resume } from "./resume";
import { resumeDataAtom, recomputePreviewAtom } from "@/src/store";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useContainerDimensions } from "@/src/hooks/useContainerDimension";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/src/components/ui/context-menu";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

export default function ResumePreview({
  width,
  isFullScreen = false,
}: {
  width?: number;
  isFullScreen?: boolean;
}) {
  // run recompute first time
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
  const [timeoutItem, setTimeoutItem] = useState<NodeJS.Timeout | null>(null);

  // recompute every second no change in resumeData
  useEffect(() => {
    // use timeout
    if (timeoutItem) {
      clearTimeout(timeoutItem);
    }
    const t = setTimeout(() => {
      if (!doRecomputePreview) {
        setDoRecomputePreview(true);
      }
    }, 1000);
    setTimeoutItem(t);

    return () => {
      if (timeoutItem) {
        clearTimeout(timeoutItem);
      }
    };
  }, [resumeData]);

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    const updateBase64String = async () => {
      const blob = await pdf(Resume({ resumeData })).toBlob();

      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPdfString(base64String);
      };
    };
    if (doRecomputePreview) {
      console.log("do recompute value!");
      updateBase64String();
      setDoRecomputePreview(false);
    }
  }, [doRecomputePreview]);

  const ref = useRef<any>(null);
  const dimension = useContainerDimensions(ref);

  if (isFullScreen) {
    return (
      <>
        <PDFViewer className="w-screen h-screen">
          {<Resume resumeData={resumeData} />}
        </PDFViewer>
      </>
    );
  }

  function handleRefresh() {
    setDoRecomputePreview(true);
  }

  return (
    <div
      ref={ref}
      className="flex flex-col h-full w-full justify-between"
    >
      {/* later issue - this will give noticable bottom margin by giving flex grow */}
      <ScrollArea className="flex-1 border-slate-400 border">
        <ContextMenu>
          <ContextMenuTrigger>
            {/* pdf preview */}
            <PDFViewerDocument
              file={pdfString}
              onLoadSuccess={onDocumentLoadSuccess}
              className="my-1" // to prevent scroll bar from showing up when the container actually has enough space
              onClick={() => {
                // router.push("/preview");
              }}
            >
              {/* -2 to prevent jitter */}
              <PDFViewerPage
                pageNumber={pageNumber}
                width={dimension.width - 3}
              />
            </PDFViewerDocument>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={handleRefresh}>Refresh</ContextMenuItem>
            <ContextMenuItem asChild>
              <Link href="/preview" target="_blank">
                Open Preview
              </Link>
            </ContextMenuItem>
            <ContextMenuItem>Download</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ScrollArea>
      <div className="flex justify-between mt-2">
        {/* page navigation */}
        <div className="flex gap-2 items-center">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
          </p>

          <div>
            <Button
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="font-bold mx-2 text-lg"
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <Button
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="font-bold mx-2 text-lg"
              variant="ghost"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        {/* button */}
        <div className="flex items-center justify-end">
          <Button onClick={handleRefresh} variant="ghost">
            <RefreshCw />
          </Button>
        </div>
      </div>
    </div>
  );
}
