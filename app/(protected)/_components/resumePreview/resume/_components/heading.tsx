import { pdf, Page, Text, View, Document, Link } from "@react-pdf/renderer";

export default function ResumeHeading({ data }: { data: string }) {
  return <Text style={{ fontSize: 18, borderBottom: "1px solid black" }}>{data}</Text>;
}
