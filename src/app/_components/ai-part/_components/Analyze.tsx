"use client";
import { Button } from "@/src/components/ui/button";
import { resumeDataToPlainText } from "@/src/lib/utils";
import { resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";

export default function Analyze() {
  const [resumeData] = useAtom(resumeDataAtom);

  const [analysisResponse, setAnalysisResponse] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalysisButtonClick() {
    setIsLoading(true);
    const resume = resumeDataToPlainText(resumeData);

    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      body: JSON.stringify({ resume }),
    });
    if (!response.ok) {
      console.error("Failed to analyze resume");
      setIsLoading(false);
      toast.error("Failed to analyze resume");
      return;
    }
    const data = await response.json();
    console.log("data", data);
    setAnalysisResponse(data);
    setIsLoading(false);
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 flex gap-2">
        <div className="py-2 w-1/3 flex justify-center items-center flex-col">
          <div>score</div>
          <div className="text-6xl">
            {analysisResponse.overall ? analysisResponse.overall : "?"}
          </div>
        </div>
        <div className="flex-1 justify-center items-center flex flex-col gap-4">
          <div className="w-full">
            <p className="flex items-center justify-between">
              <span>ATS Keywords</span>
              <span>
                {analysisResponse.ATSKeywords
                  ? analysisResponse.ATSKeywords
                  : "?"}
              </span>
            </p>
            <ProgressBar
              value={analysisResponse.ATSKeywords ?? 0}
              color="teal"
              className=""
            />
          </div>
          <div className="w-full">
            <p className="flex items-center justify-between">
              <span>Action Words</span>
              <span>
                {" "}
                {analysisResponse.actionKeywords
                  ? analysisResponse.actionKeywords
                  : "?"}
              </span>
            </p>
            <ProgressBar
              value={analysisResponse.actionKeywords ?? 0}
              color="rose"
              className=""
            />
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          onClick={handleAnalysisButtonClick}
          disabled={isLoading}
          className="w-12 h-12"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
        </Button>
      </div>
    </div>
  );
}

import { Card, ProgressBar } from "@tremor/react";
import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

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
