import { HeadingType } from "@/src/lib/type";
import { Text } from "@react-pdf/renderer";

export default function ResumeHeading({ item }: { item: HeadingType }) {
  return <Text style={{ fontSize: 18 }}>{item.data}</Text>;
}
