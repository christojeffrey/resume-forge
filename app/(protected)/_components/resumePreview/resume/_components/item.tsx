import { Text, View } from "@react-pdf/renderer";

type ResumeItemData = {
  title: string;
  date: string;
  subtitle: string;
  moreInformation: string;
  details: {
    htmlValue: string;
    objectValue: any;
  };
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
        {data.details.objectValue.map((item: any, index: number) => (
          <>
            {item.attributes?.bold ? (
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
                      <Text key={i} wrap={i !== array.length - 1}>
                        {line}
                      </Text>
                    </>
                  );
                })
            )}
          </>
        ))}
      </View>
    </>
  );
}
