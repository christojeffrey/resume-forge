"use client";
import { useAtom } from "jotai";
import ResumeDraggablePart from "../_components/draggable-part";
import {
  currentResumeWorkspaceAtom,
  isEditingAtom,
  modeAtom,
  resumeDataAtom,
  resumesDataAtom,
  updateResumeDataBasedOnCurrentWorkspaceEffect,
} from "@/src/store";

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
import { Download, Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/src/components/ui/context-menu";
import Saver from "../_components/saver";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";

// main page

export default function Home() {
  useAtom(updateResumeDataBasedOnCurrentWorkspaceEffect);
  const isMobile = useIsMobile();
  const [mode] = useAtom(modeAtom);
  const [resumeData] = useAtom(resumeDataAtom);

  if (resumeData.length === 0) {
    return (
      <div className="h-full flex flex-col py-2 xl:px-0 px-2  xl:w-3/4 mx-auto">
        <EmptyResumePrompt />
        <BottomWorkspace hideDownload />
      </div>
    );
  }

  if (isMobile) {
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
          <TabsContent value="edit" className="flex-1">
            <ResumeDraggablePart />
          </TabsContent>
          <TabsContent value="view" className="flex-1">
            <ResumePreviewPart />
          </TabsContent>
          <BottomWorkspace />
        </Tabs>
      </div>
    );
  }
  return (
    <div className="h-full">
      {/* full screen*/}
      <div className="w-3/4 mx-auto h-full py-2 gap-2">
        <div className="flex flex-col h-full gap-2">
          {/* top */}
          <div className="flex-1 flex h-full overflow-auto">
            {/* left */}
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel
                minSize={30}
                className={`${mode === "edit" ? "w-full" : "w-full"} mr-1 flex flex-col h-full overflow-auto gap-2 transition-all duration-300 ease-out`}
              >
                <ResumeDraggablePart />
              </ResizablePanel>
              <ResizableHandle className="mx-1" />

              {/* right */}
              <ResizablePanel
                minSize={30}
                className={`${mode === "edit" ? "w-full mr-2" : "w-full"} ml-1 flex flex-col h-full transition-all duration-300 ease-out`}
              >
                <ResumePreviewPart />
              </ResizablePanel>
            </ResizablePanelGroup>
            {/* AI */}
            <div
              className={`${mode === "edit" ? "w-72 opacity-100 ml-1" : "w-0 opacity-0"} transition-all duration-300 ease-out overflow-x-clip relative`}
            >
              {/* prevent this from collapsing when closed */}
              <div className="w-72 h-full overflow-x-clip absolute">
                <AIAnalysis />
              </div>
            </div>
          </div>
          <BottomWorkspace />
        </div>
      </div>
    </div>
  );
}

function BottomWorkspace({ hideDownload = false }: { hideDownload?: boolean }) {
  const [currentResumeWorkspace, setCurrentResumeWorkspace] = useAtom(
    currentResumeWorkspaceAtom
  );
  const [resumeData] = useAtom(resumeDataAtom);
  const [resumesData, setResumesData] = useAtom(resumesDataAtom);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Tabs value={currentResumeWorkspace} className="">
            <TabsList>
              {Array.from(Array(3).keys()).map(i => (
                <ContextMenu key={i + 1}>
                  <ContextMenuTrigger>
                    <TabsTrigger
                      value={(i + 1).toString()}
                      onClick={() => {
                        console.log("changing workspace");
                        setCurrentResumeWorkspace((i + 1).toString());
                      }}
                    >
                      {i + 1}
                    </TabsTrigger>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    {Array.from(Array(3).keys()).map(friend => {
                      if (friend === i) {
                        return <></>;
                      }
                      return (
                        <ContextMenuItem
                          key={friend}
                          onClick={() => {
                            const sourceWorkspaceAsString = (i + 1).toString();
                            const targetWorkspaceAsString = (
                              friend + 1
                            ).toString();
                            setResumesData({
                              ...resumesData,
                              [targetWorkspaceAsString]:
                                resumesData[sourceWorkspaceAsString],
                            });
                          }}
                        >
                          duplicate workspace {i + 1} to {friend + 1}
                        </ContextMenuItem>
                      );
                    })}
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TabsList>
          </Tabs>
          {/* <Button variant="outline" className="p-2">
                <Plus className="h-4" />
              </Button> */}
        </div>
        <div className={`flex gap-2 ${hideDownload ? "hidden" : ""}`}>
          <Saver />
          <Button variant="outline">
            <PDFDownloadLink
              document={Resume({ resumeData })}
              fileName="resume.pdf"
            >
              {({ blob, url, loading, error }) => (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Download />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download Resume</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </PDFDownloadLink>
          </Button>
        </div>
      </div>
    </>
  );
}
