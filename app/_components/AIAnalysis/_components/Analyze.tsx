import { Button } from "@/components/ui/button";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Analyze() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [resumeText, setResumeText] = useState("");

  async function handleAnalysisButtonClick() {
    const resume = resumeDataToPlainText();

    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      body: JSON.stringify({ resume }),
    });
    console.log("response", response);

    // hit API
  }
  //   TODO: turn this into markdown instead
  function resumeDataToPlainText() {
    let newResumeText = "";
    resumeData.forEach((item: any) => {
      if (!item.draft) {
        if (item.type === "title") {
          newResumeText += item.data + "\n";
        }
        if (item.type === "links") {
          newResumeText +=
            item.data.map((link: any) => link.href).join("\n") + "\n";
        }
        if (item.type === "heading") {
          newResumeText += "# " + item.data + "\n";
        }
        if (item.type === "item") {
          newResumeText += item.data.title + "\n";
          newResumeText += item.data.subtitle + "\n";
          newResumeText += item.data.date + "\n";
          newResumeText += item.data.moreInformation + "\n";
          newResumeText += item.data.details.htmlValue + "\n";
        }
        if (item.type === "divider") {
          newResumeText += "----------------\n";
        }
      }
    });

    console.log("newResumeText");
    console.log(newResumeText);
    setResumeText(newResumeText);
    return resumeText;
  }
  return (
    <>
      analyze
      <Button onClick={handleAnalysisButtonClick}>analyze</Button>
      {resumeText}
    </>
  );
}
