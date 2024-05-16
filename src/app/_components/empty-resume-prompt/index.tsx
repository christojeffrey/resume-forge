"use client";
import { useAtom } from "jotai";
import { generateID, resumeDataAtom } from "@/src/store";
import { useState } from "react";
import Adder from "../adder";
import { Button } from "@/src/components/ui/button";
import { hardCodedData } from "@/constant/exampleData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

export default function EmptyResumePrompt() {
  const [, setResumeData] = useAtom(resumeDataAtom);
  const [description, setDescription] = useState("");

  function handleCreateExampleButtonClick() {
    setResumeData(generateID(hardCodedData));
  }
  async function handleGenerateResumeClick() {
    const response = await fetch("/api/ai/generate-resume", {
      method: "POST",
      body: JSON.stringify({
        description,
      }),
    }).then(res => res.json());
    console.log("response", response);
    setResumeData(response);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-lg font-semibold text-slate-500">
        Your resume is empty
      </p>
      <p className="text-slate-400">
        Click the button below to add a new section
      </p>
      {/* add new component, or create from example */}
      <Adder>
        <Button variant="outline">Add</Button>
      </Adder>
      {/* create from example */}
      <Button
        variant="outline"
        className="mt-2"
        onClick={handleCreateExampleButtonClick}
      >
        Create from example
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="mt-2">
            Generate Resume
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col">
            <div className="text-xs mb-2">
              Describe yourself! Be as detailed as possible!
            </div>

            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Button onClick={handleGenerateResumeClick} variant="ghost" className="mt-2">
              Generate!
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
