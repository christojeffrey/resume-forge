import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { resumeDataToPlainText } from "@/lib/utils";
import { resumeDataAtom } from "@/store";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useState } from "react";

export default function GenerateCoverLetter() {
  const [resumeData] = useAtom(resumeDataAtom);
  const [job, setJob] = useState<string>("");
  const [responseCoverLetter, setResponseCoverLetter] = useState<string>("");
  async function handleGenerateCoverLetterClick() {
    const resume = resumeDataToPlainText(resumeData);

    const response = await fetch("/api/ai/cover-letter", {
      method: "POST",
      body: JSON.stringify({ resume, job }),
    }).then(res => res.json());
    console.log("response", response);
    setResponseCoverLetter(response.coverLetter);
  }
  return (
    <>
      generate cover letter
      <Select
        onValueChange={value => setJob(value as string)}
        defaultValue="Software Engineer"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select job" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Computer Science</SelectLabel>
            <SelectItem value="Software Engineer">Software Engineer</SelectItem>
            <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleGenerateCoverLetterClick}>generate</Button>
      <div>{responseCoverLetter}</div>
    </>
  );
}
