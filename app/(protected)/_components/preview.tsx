"use client";

import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, Link, BlobProvider } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { Document as PDFViewerDocument, Page as PDFViewerPage } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { recomputePreviewAtom, resumeDataAtom } from "../page";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function Preview() {
  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [doRecomputePreview, setDoRecomputePreview] = useAtom(recomputePreviewAtom);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
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
    <div className="flex justify-center items-center">
      <div>
        <PDFViewerDocument file={pdfString} onLoadSuccess={onDocumentLoadSuccess}>
          <PDFViewerPage pageNumber={pageNumber} className="border-2 border-black testing" width={300} />
        </PDFViewerDocument>
        <div className="border-2 border-black">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </button>
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
{
  /* <PDFViewer className="w-1/2 h-screen" showToolbar={true}>
          <Resume />
        </PDFViewer> */
}
const styles = StyleSheet.create({
  body: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 900,
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const ResumeTitle = ({ data }: { data: string }) => {
  return (
    <>
      <Text style={{ fontSize: 14, textAlign: "center" }}>{data}</Text>
    </>
  );
};

type ResumeLink = {
  title: string;
  href: string;
};

const ResumeLinks = ({ data }: { data: ResumeLink[] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.map((link, index) => (
        <Text key={index} style={{ margin: 1 }}>
          <Link src={link.href}>{link.title}</Link>
        </Text>
      ))}
    </View>
  );
};
const ResumeHeading = ({ data }: { data: string }) => {
  return <Text style={{ fontSize: 18, borderBottom: "1px solid black" }}>{data}</Text>;
};
type ResumeItemData = {
  title: string;
  date: string;
  subtitle: string;
  moreInformation: string;
};
const ResumeItem = ({ data }: { data: ResumeItemData }) => {
  return (
    <>
      <View style={{ textAlign: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12, fontFamily: "Times-Bold" }}>{data.title}</Text>
        <Text>{data.date}</Text>
      </View>
      <View style={{ textAlign: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{data.subtitle}</Text>
        <Text>{data.moreInformation}</Text>
      </View>
    </>
  );
};

const Divider = () => {
  return <View style={{ borderBottom: "1px solid black" }} />;
};

const typeToComponents = [
  { type: "title", component: ResumeTitle },
  { type: "links", component: ResumeLinks },
  { type: "heading", component: ResumeHeading },
  { type: "item", component: ResumeItem },
  { type: "divider", component: Divider },
];

const Resume = (resumeData: any) => {
  return (
    <Document>
      <Page style={styles.body}>
        {resumeData.map((item, index) => {
          const { type, data, id } = item;
          const Component = typeToComponents.find((component) => component.type === type)?.component;
          if (!Component) {
            return null;
          }
          return <Component key={id} data={data} />;
        })}
      </Page>
    </Document>
  );
};
