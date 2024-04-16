import { pdf, Page, Text, View, Document, Link } from "@react-pdf/renderer";

type ResumeItemData = {
  title: string;
  date: string;
  subtitle: string;
  moreInformation: string;
  details: string[];
};
export default function ResumeItem({ data }: { data: ResumeItemData }) {
  return (
    <>
      <View
        style={{
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 12, fontFamily: "Times-Bold" }}>
          {data.title}
        </Text>
        <Text>{data.date}</Text>
      </View>
      <View
        style={{
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{data.subtitle}</Text>
        <Text>{data.moreInformation}</Text>
      </View>
      <View style={{ margin: 1 }}>
        {data.details.map((detail, index) => (
          <Text key={index}>{detail}</Text>
        ))}
      </View>
    </>
  );
}
