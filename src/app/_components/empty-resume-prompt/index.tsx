"use client";
import { useAtom } from "jotai";
import { resumeDataAtom } from "@/src/store";
import { useState } from "react";
import Adder from "../adder";
import { Button } from "@/src/components/ui/button";
import { hardCodedData } from "@/constant/exampleData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";

import pdfToText from "react-pdftotext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateID } from "@/src/lib/utils";

export default function EmptyResumePrompt() {
  const [, setResumeData] = useAtom(resumeDataAtom);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleCreateExampleButtonClick() {
    setResumeData(generateID(hardCodedData));
  }
  async function handleGenerateResumeClick() {
    setIsLoading(true);
    const response = await fetch("/api/ai/generate-resume", {
      method: "POST",
      body: JSON.stringify({
        description,
      }),
    });
    if (!response.ok) {
      console.error("Failed to generate resume");
      setIsLoading(false);
      toast.error("Failed to generate resume");
      return;
    }
    const resumeData = await response.json();

    console.log("data", resumeData);
    setResumeData(resumeData);
    setIsLoading(false);
  }
  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text: string) => {
        console.log(text);
        setDescription(text);
      })
      .catch((error: any) => console.error("Failed to extract text from pdf"));
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-lg font-semibold text-slate-500">
        Your resume is empty
      </p>
      <p className="text-slate-400">
        Click the button below to add a new section
      </p>
      {/* add new component, or create from example */}
      <Adder>
        <Button variant="outline" className="w-80" disabled={isLoading}>
          Add
        </Button>
      </Adder>
      {/* create from example */}
      <Button
        variant="outline"
        className="mt-2 w-80"
        onClick={handleCreateExampleButtonClick}
        disabled={isLoading}
      >
        Create from Example
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="mt-2 w-80" disabled={isLoading}>
            Generate Resume from Description
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="flex flex-col">
            <div className="text-xs mb-2">
              Describe yourself! Be as detailed as possible!
            </div>

            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Button
              onClick={handleGenerateResumeClick}
              variant="ghost"
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate!
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="mt-2 w-80" disabled={isLoading}>
            Generate Resume from Previous Resume PDF
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="flex flex-col">
            <div className="text-xs mb-2">Input your PDF</div>
            <Input
              type="file"
              accept="application/pdf"
              onChange={extractText}
            />

            <Button
              onClick={handleGenerateResumeClick}
              variant="ghost"
              className="mt-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate!
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
