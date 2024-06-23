import { simplifyQuillDelta } from "@/src/lib/utils";
import { Dot } from "lucide-react";

export default function RichTextRenderer({ quillDelta }: any) {
  const parsedQuill = simplifyQuillDelta(quillDelta);

  return parsedQuill.paragraphs.map((paragraph: any, index: number) => {
    return <ParagraphRenderer key={index} paragraph={paragraph} />;
  });
}

function TextRunsRenderer({ textRuns }: any) {
  return textRuns.map((textRun: any, index: number) => {
    return (
      <span key={index} className={textRun.attributes?.bold ? "font-bold" : ""}>
        {textRun.text}
      </span>
    );
  });
}
function ParagraphRenderer({ paragraph }: any) {
  if (paragraph.attributes?.list === "ordered") {
    return (
      <div className="flex">
        <div className="mr-2">{paragraph.attributes.number}.</div>
        <div>
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </div>
      </div>
    );
  }
  if (paragraph.attributes?.list === "bullet") {
    return (
      <div className="flex">
        {/* left side */}
        <div>
          <Dot />
        </div>
        {/* right side */}
        <div>
          <TextRunsRenderer textRuns={paragraph.textRuns} />
        </div>
      </div>
    );
  }
  return <TextRunsRenderer textRuns={paragraph.textRuns} />;
}
