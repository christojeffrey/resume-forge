import { Label } from "@/src/components/ui/label";
import { SectionType } from "@/src/lib/type";
import { Dot } from "lucide-react";
const QuillParser = require("quilljs-parser");

export default function SectionViewer({ item }: { item: SectionType }) {
  return (
    <>
      <Label className="text-xs font-semibold text-slate-400">Section</Label>
      <h3 className="text-xl font-semibold">{item?.data?.title}</h3>
      <h4 className="text-lg font-semibold">{item?.data?.subtitle}</h4>
      <p>{item?.data?.date}</p>
      <p>{item?.data?.moreInformation}</p>
      <RichTextRenderer quillDelta={item?.data?.details?.objectValue} />
    </>
  );
}

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
