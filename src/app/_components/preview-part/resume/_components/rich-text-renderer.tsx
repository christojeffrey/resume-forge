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
      flexDirection: "row",
      gap: 4,
      textAlign: "justify",
    },
    bulletList: {
      marginTop: 5,
      marginRight: 4,
    },
    textPart: {
      width: "100%",
    },
  });
  if (paragraph.attributes?.list === "ordered") {
    return (
      <View style={styles.listItem}>
        {/* left side */}
        <Text>{paragraph.attributes.number}.</Text>
        {/* right side */}
        <Text style={styles.textPart}>
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
          <Svg width={6} height={6}>
            <Circle cx="3" cy="3" r="3" fill="black" />
          </Svg>
        </View>
        {/* right side */}
        <Text style={styles.textPart}>
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </Text>
      </View>
    );
  }
  return <TextRunsRenderer textRuns={paragraph.textRuns} />;
}
