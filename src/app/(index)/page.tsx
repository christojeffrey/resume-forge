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
import { Button } from "@/src/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Resume } from "../_components/preview-part/resume";
import { Plus } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/src/components/ui/context-menu";

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
        <div className="flex flex-col h-full gap-2">
          {/* top */}
          <div className="flex-1 flex h-full gap-2 overflow-auto">
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
            {/* AI */}
            <div
              className={`${mode === "edit" ? "w-1/5 opacity-100" : "w-0 opacity-0"} flex flex-col h-full transition-all duration-300 ease-out overflow-x-clip`}
            >
              <AIAnalysis />
            </div>
          </div>
          <div className=" flex justify-between">
            <div className="flex items-center gap-2">
              <Tabs>
                <TabsList>
                  {Array.from(Array(3).keys()).map(i => (
                    <ContextMenu key={i + 1}>
                      <ContextMenuTrigger>
                        <TabsTrigger value={(i + 1).toString()}>
                          {i + 1}
                        </TabsTrigger>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>
                          duplicate workspace {i + 1}
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </TabsList>
              </Tabs>
              <Button variant="outline" className="p-2">
                <Plus className="h-4" />
              </Button>
            </div>
            <Button variant="outline">
              <PDFDownloadLink
                document={Resume({ resumeData })}
                fileName="resume.pdf"
              >
                {({ blob, url, loading, error }) => "Download"}
              </PDFDownloadLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
