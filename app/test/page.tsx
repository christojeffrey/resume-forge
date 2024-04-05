"use client";
import { Page, Text, View, Document, StyleSheet, Image, Font, PDFViewer, Link, render } from "@react-pdf/renderer";
export default function testPage() {
  return (
    <PDFViewer className="w-[96] h-[96] overflow-clip" showToolbar={false}>
      <Resume />
    </PDFViewer>
  );
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
      <Description>testing</Description>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);
