"use client";
import { useAtom } from "jotai";
import Preview from "./_components/resumePreview";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "./_components/resumeEditor/ResumeEditor";
import { recomputePreviewAtom, resumeDataAtom, userAtom } from "@/store";
import { CommandMenu } from "./_components/commandMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Adder from "./_components/adder";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";

// main page

export default function Home() {
  const [recomputePreview, setRecomputePreview] = useAtom(recomputePreviewAtom);
  const [resumeData, _setResumeData] = useAtom(resumeDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);

  const [timeoutItem, setTimeoutItem] = useState<NodeJS.Timeout | null>(null);
  // recompute every 2 seconds no change in resumeData
  useEffect(() => {
    // use timeout
    if (timeoutItem) {
      clearTimeout(timeoutItem);
    }
    const t = setTimeout(() => {
      setRecomputePreview(!recomputePreview);
    }, 1000);
    setTimeoutItem(t);

    return () => {
      if (timeoutItem) {
        clearTimeout(timeoutItem);
      }
    };
  }, [resumeData]);

  // run recompute first time
  useEffect(() => {
    setRecomputePreview(!recomputePreview);
  }, []);
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
                <Button
                  onClick={async () => {
                    const res = await fetch(`/api/resume/${userData.email}`, {
                      method: "POST",
                      body: JSON.stringify(resumeData),
                    });
                    // console.log(res);
                  }}
                >
                  save
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
          <Preview width={300} />
          <Link href="/preview">preview</Link>
        </div>
        {/* left side */}
        <div className="absolute left-0 top-0">
          <Adder />
        </div>
      </div>
    </div>
  );
}
