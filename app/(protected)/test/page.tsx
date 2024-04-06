"use client";

import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, Link, BlobProvider } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";
import { Document as PDFViewerDocument, Page as PDFViewerPage } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function TestPage() {
  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [doCalcuateBlob, setDoCalculateBlob] = useState(true);

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
      const blob = await pdf(Resume()).toBlob();
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPdfString(base64String);
      };
    };
    if (doCalcuateBlob) updateBase64String();
  }, [doCalcuateBlob]);

  return (
    <div className="w-screen flex justify-center items-center">
      <div>
        <PDFViewerDocument file={pdfString} onLoadSuccess={onDocumentLoadSuccess}>
          <PDFViewerPage pageNumber={pageNumber} className="border-2 border-black" />
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

const ResumeTitle = () => {
  return (
    <>
      <Text style={{ fontSize: 14, textAlign: "center" }}>testing</Text>
    </>
  );
};

type ResumeLink = {
  title: string;
  url: string;
};

const ResumeLinks = ({ links }: { links: ResumeLink[] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {links.map((link, index) => (
        <Text key={index} style={{ margin: 1 }}>
          <Link src={link.url}>{link.title}</Link>
        </Text>
      ))}
    </View>
  );
};
const ResumeSectionHeading = ({ children }: { children: string }) => {
  return <Text style={{ fontSize: 18, borderBottom: "1px solid black" }}>{children}</Text>;
};

const ResumeItemHeading = ({ title, date, subtitle, keyword }: { title: string; date: string; subtitle: string; keyword: string }) => {
  return (
    <>
      <View style={{ textAlign: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12, fontFamily: "Times-Bold" }}>{title}</Text>
        <Text>{date}</Text>
      </View>
      <View style={{ textAlign: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{subtitle}</Text>
        <Text>{keyword}</Text>
      </View>
    </>
  );
};

const Description = ({ children }: { children: string }) => {
  return <Text style={{ fontSize: 12 }}>{children}</Text>;
};
const Divider = () => {
  return <View style={{ borderBottom: "1px solid black" }} />;
};
const Resume = () => (
  <Document>
    <Page style={styles.body}>
      <ResumeTitle />
      <ResumeLinks
        links={[
          { title: "test", url: "https://www.google.com" },
          { title: "test", url: "https://www.google.com" },
          { title: "test", url: "https://www.google.com" },
          { title: "test", url: "https://www.google.com" },
        ]}
      />
      <ResumeSectionHeading>Education</ResumeSectionHeading>
      <ResumeItemHeading title="title" date="22 Aug - Sep 23" subtitle="subtitle" keyword="react, next" />
      {/* flex */}
      <Description>asdf</Description>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);
