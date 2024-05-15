import { HeadingType } from "@/src/lib/type";
import { pdf, Page, Text, View, Document, Link } from "@react-pdf/renderer";

export default function ResumeHeading({ item }: { item: HeadingType }) {
  return (
    <Text style={{ fontSize: 18, borderBottom: "1px solid black" }}>
      {item.data}
    </Text>
  );
}
