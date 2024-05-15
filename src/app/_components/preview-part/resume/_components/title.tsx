import { TitleType } from "@/src/lib/type";
import { Text } from "@react-pdf/renderer";

export default function ResumeTitle({ item }: { item: TitleType }) {
  return (
    <>
      <Text style={{ fontSize: 14, textAlign: "center" }}>{item.data}</Text>
    </>
  );
}
