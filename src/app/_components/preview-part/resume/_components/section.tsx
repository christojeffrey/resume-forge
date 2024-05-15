import { SectionType } from "@/src/lib/type";
import { Text, View } from "@react-pdf/renderer";

export default function ResumeSection({ item }: { item: SectionType }) {
  // console.log("data", data);
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
          {item.data.title}
        </Text>
        <Text>{item.data.date}</Text>
      </View>
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
      <View style={{ margin: 1 }}>
        {/* example intended structure */}
        {/* <Text>
          2testin
          <Text style={{ fontFamily: "Times-Bold" }}>testin</Text>
          asdfasd{`\n`}asdf
        </Text> */}
        <Text>
          {item.data.details.objectValue.map((item: any, index: number) =>
            item.attributes?.bold ? (
              <Text
                key={index}
                style={{ fontFamily: "Times-Bold" }}
                wrap={false}
              >
                {item.insert}
              </Text>
            ) : (
              item.insert
                .split("\n")
                .map((line: string, i: number, array: string[]) => {
                  return (
                    <>
                      {line}
                      {i !== array.length - 1 && `\n`}
                    </>
                  );
                })
            )
          )}
        </Text>
      </View>
    </>
  );
}
