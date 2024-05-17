"use client";
import { useAtom } from "jotai";
import ResumeDraggablePart from "../_components/draggable-part";
import { isEditingAtom, modeAtom, resumeDataAtom } from "@/src/store";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import AIAnalysis from "../_components/ai-part";
import ResumePreviewPart from "../_components/preview-part";
import EmptyResumePrompt from "../_components/empty-resume-prompt";

// main page

export default function Home() {
  const [mode] = useAtom(modeAtom);
  const [resumeData] = useAtom(resumeDataAtom);

  if (resumeData.length === 0) {
    return <EmptyResumePrompt />;
  }
  return (
    <div className="h-full">
      {/* phone */}
      <Tabs
        defaultValue="edit"
        className="xl:hidden flex flex-col h-full p-2 overflow-auto"
      >
        <TabsList className="w-fit mx-auto">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="view">View</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <ResumeDraggablePart />
        </TabsContent>
        <TabsContent value="view">
          <ResumePreviewPart />
        </TabsContent>
      </Tabs>
      {/* full */}
      <div className="hidden xl:block w-3/4 mx-auto h-full py-2 gap-2">
        <div className="flex h-full gap-2">
          {/* left */}
          <div
            className={`${mode === "edit" ? "w-2/5" : "w-1/2"} flex flex-col h-full overflow-auto gap-2 transition-all duration-300 ease-out`}
          >
            <ResumeDraggablePart />
          </div>

          {/* right */}
          <div
            className={`${mode === "edit" ? "w-2/5" : "w-1/2"} flex flex-col h-full transition-all duration-300 ease-out`}
          >
            <ResumePreviewPart />
          </div>
          <div
            className={`${mode === "edit" ? "w-1/5" : "w-0"} overflow-x-clip h-full transition-all duration-300 ease-out`}
          >
            <div className="full">
              <AIAnalysis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
