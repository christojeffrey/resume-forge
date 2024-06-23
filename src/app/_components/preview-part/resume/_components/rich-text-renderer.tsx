"use client";
import { simplifyQuillDelta } from "@/src/lib/utils";
import { Circle, Svg, Text, View, StyleSheet } from "@react-pdf/renderer";

type TextRun = {
  text: string;
  attributes?: {
    bold?: boolean;
  };
};
export default function RichTextRenderer({ quillDelta }: any) {
  const parsedQuill = simplifyQuillDelta(quillDelta);

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
    listItem: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      width: "100%",
    },
    bulletList: {
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
      <View style={styles.listItem}>
        {/* left side */}
        <View>
          <Text>{paragraph.attributes.number}.</Text>
        </View>
        {/* right side */}
        <Text>
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </Text>
      </View>
    );
  }
  if (paragraph.attributes?.list === "bullet") {
    return (
      <View style={styles.listItem}>
        {/* left side */}
        <View style={styles.bulletList}>
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
