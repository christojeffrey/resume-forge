"use client";
import { useAtom } from "jotai";
import Preview from "./_components/resumePreview";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "./_components/resumeEditor/ResumeEditor";
import { recomputePreviewAtom } from "@/store";
import { CommandMenu } from "./_components/commandMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Adder from "./_components/adder";
import { ScrollArea } from "@/components/ui/scroll-area";

// main page

export default function Home() {
  const [recomputePreview, setRecomputePreview] = useAtom(recomputePreviewAtom);
  return (
    <div className="h-full w-3/4 mx-auto py-2">
      <div className="h-full relative">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-full flex flex-col justify-between">
              <ScrollArea className="w-1/2 mx-auto">
                <ResumeEditor />
              </ScrollArea>
              <div className="text-end">
                <Button
                  onClick={() => {
                    setRecomputePreview(!recomputePreview);
                  }}
                >
                  recompute
                </Button>
              </div>
            </div>
            <CommandMenu />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>add new item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {/* right side */}
        <div className="absolute right-0 top-0">
          <Preview />
        </div>
        {/* left side */}
        <div className="absolute left-0 top-0">
          <Adder />
        </div>
      </div>
    </div>
  );
}
