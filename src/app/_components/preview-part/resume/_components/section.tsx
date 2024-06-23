import { SectionType } from "@/src/lib/type";
import { Text, View } from "@react-pdf/renderer";
import RichTextRenderer from "./rich-text-renderer";

export default function ResumeSection({ item }: { item: SectionType }) {
  const quillDelta = item.data.details.objectValue;
  return (
    <>
      <View
        style={{
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* title */}
        <Text style={{ fontSize: 12, fontFamily: "Times-Bold" }}>
          {item.data.title}
        </Text>
        {/* date */}
        <Text>{item.data.date}</Text>
      </View>
      {/* subtitle and more information */}
      <View
        style={{
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.data.subtitle}</Text>
        <Text>{item.data.moreInformation}</Text>
      </View>
      {/* the main information */}
      <View style={{ margin: 1 }}>
        <RichTextRenderer quillDelta={quillDelta} />
      </View>
    </>
  );
}
