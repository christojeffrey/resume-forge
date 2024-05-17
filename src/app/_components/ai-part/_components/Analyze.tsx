"use client";
import { Button } from "@/src/components/ui/button";
import { resumeDataToPlainText } from "@/src/lib/utils";
import { latestAnalysisAtom, resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";

export default function Analyze() {
  const [resumeData] = useAtom(resumeDataAtom);

  const [analysisResponse, setAnalysisResponse] = useAtom(latestAnalysisAtom);

  async function handleAnalysisButtonClick() {
    const resume = resumeDataToPlainText(resumeData);

    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      body: JSON.stringify({ resume }),
    }).then(res => res.json());
    console.log("response", response);
    setAnalysisResponse(response);
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 flex gap-2">
        <div className="py-2">
          <div>score</div>
          <div className="text-6xl">96</div>
        </div>
        <div className="flex-1 justify-center items-center flex flex-col gap-4">
          <div className="w-full">
            <p className="flex items-center justify-between">
              <span>ATS Keywords</span>
              <span>78</span>
            </p>
            <ProgressBar value={78} color="teal" className="" />
          </div>
          <div className="w-full">
            <p className="flex items-center justify-between">
              <span>Action Words</span>
              <span>89</span>
            </p>
            <ProgressBar value={89} color="rose" className="" />
          </div>
        </div>
      </div>

      <div>
        <Button variant="outline">R</Button>
      </div>
    </div>
  );
}

import { Card, ProgressBar } from "@tremor/react";

export function ProgressBarScore({
  currentScore,
  title,
  maxScore,
}: {
  currentScore: number;
  title: string;
  maxScore: number;
}) {
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>{currentScore}</span>
          <span>{title}</span>
          <span>{maxScore}</span>
        </p>
        <ProgressBar
          value={currentScore / maxScore}
          color="teal"
          className="mt-3"
        />
      </Card>
    </>
  );
}
