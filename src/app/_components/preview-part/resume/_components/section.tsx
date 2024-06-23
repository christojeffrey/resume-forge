import { SectionType } from "@/src/lib/type";
import { Circle, Svg, Text, View, StyleSheet } from "@react-pdf/renderer";

const QuillParser = require("quilljs-parser");

export default function ResumeSection({ item }: { item: SectionType }) {
  const quillDelta = item.data.details.objectValue;
  const parsedQuill = QuillParser.parseQuillDelta({ ops: quillDelta });
  console.log(parsedQuill);
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

type TextRun = {
  text: string;
  attributes?: {
    bold?: boolean;
  };
};
function RichTextRenderer({ quillDelta }: any) {
  const parsedQuill = QuillParser.parseQuillDelta({ ops: quillDelta });
  // parse it again. if it has ordered list, add 'number' attribute in attributes
  let isPreviousAnOrderedList = false;
  let previousNumber = 0;
  for (let i = 0; i < parsedQuill.paragraphs.length; i++) {
    const paragraph = parsedQuill.paragraphs[i];
    if (paragraph.attributes?.list === "ordered") {
      if (!isPreviousAnOrderedList) {
        isPreviousAnOrderedList = true;
        previousNumber = 1;
      }
      paragraph.attributes.number = previousNumber++;
    } else {
      isPreviousAnOrderedList = false;
    }
  }
  console.log("parsedquill", parsedQuill);

  return parsedQuill.paragraphs.map((paragraph: any, index: number) => {
    // return <></>;
    return <ParagraphRenderer key={index} paragraph={paragraph} />;
  });
}

function TextRunsRenderer({ textRuns }: any) {
  return textRuns.map((textRun: TextRun, index: number) => {
    return (
      <Text
        key={index}
        style={textRun.attributes?.bold ? { fontFamily: "Times-Bold" } : {}}
      >
        {textRun.text}
      </Text>
    );
  });
}
function ParagraphRenderer({ paragraph }: any) {
  // styles
  const styles = StyleSheet.create({
    list: {
      display: "flex",
      flexDirection: "column",
    },
    listItem: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      width: "100%",
    },
    bullet: {
      marginTop: 6,
    },
    text: {
      flex: 1,
      paddingBottom: 0,
      marginBottom: 0,
    },
  });
  if (paragraph.attributes?.list === "ordered") {
    return (
      <View>
        <Text>
          {paragraph.attributes.number}.{" "}
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </Text>
      </View>
    );
  }
  if (paragraph.attributes?.list === "bullet") {
    return (
      <View style={styles.listItem}>
        {/* left side */}
        <View style={styles.bullet}>
          <Svg width={2} height={2}>
            <Circle cx="1" cy="1" r="2" fill="black" />
          </Svg>
        </View>
        {/* right side */}
        <Text>
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </Text>
      </View>
    );
  }
  return <TextRunsRenderer textRuns={paragraph.textRuns} />;
}
