import { DividerType } from "@/src/lib/type";
import { pdf, Page, Text, View, Document, Link } from "@react-pdf/renderer";

export default function Divider({ item }: { item: DividerType }) {
  return <View style={{ borderBottom: "1px solid black" }} />;
}
