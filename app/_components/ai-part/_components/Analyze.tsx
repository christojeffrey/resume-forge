"use client";
import { Button } from "@/components/ui/button";
import { resumeDataToPlainText } from "@/lib/utils";
import { latestAnalysisAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

export default function Analyze() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

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
    <div className="flex flex-col">
      <div className="text-3xl">analyze</div>
      <Button onClick={handleAnalysisButtonClick}>analyze</Button>
      {/* keywordAndATSOptimization score */}
      {analysisResponse.keywordAndATSOptimization !== undefined && (
        <div>
          <div className="text-xl font-bold mt-4">
            Keyword And ATS Optimization
          </div>
          <ProgressBarScore
            maxScore="10"
            currentScore={analysisResponse.keywordAndATSOptimization}
            title="keyword And ATS Optimization"
          />
        </div>
      )}
      {/* ActionVerbs score */}
      {analysisResponse.actionVerbs !== undefined && (
        <div>
          <div className="text-xl font-bold mt-4">
            Action Verbs Optimization
          </div>
          <ProgressBarScore
            maxScore="10"
            currentScore={analysisResponse.actionVerbs}
            title="keyword And ATS Optimization"
          />
        </div>
      )}
      {/* relevantIndustries */}
      {analysisResponse.relevantIndustries && (
        <div>
          <div className="text-xl font-bold mt-4">Relevant Industries</div>

          {analysisResponse.relevantIndustries.map((industry: string) => (
            <div key={industry}>{industry}</div>
          ))}
        </div>
      )}
      {/* suggestions */}
      {analysisResponse.suggestions && (
        <div>
          <div className="text-xl font-bold mt-4">Suggestions</div>
          {analysisResponse.suggestions.map((suggestion: string) => (
            <div key={suggestion}>{suggestion}</div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Card, ProgressBar } from "@tremor/react";

export function ProgressBarScore({ currentScore, title, maxScore }: any) {
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
