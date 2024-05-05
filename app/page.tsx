"use client";
import { useAtom } from "jotai";
import Preview from "./_components/resumePreview";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "./_components/resumeEditor/ResumeEditor";
import {
  isSavingAtom,
  recomputePreviewAtom,
  resumeDataAtom,
  userAtom,
} from "@/store";

import Adder from "./_components/adder";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
// main page

export default function Home() {
  const [recomputePreview, setRecomputePreview] = useAtom(recomputePreviewAtom);
  const [resumeData, _setResumeData] = useAtom(resumeDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);

  const [timeoutItem, setTimeoutItem] = useState<NodeJS.Timeout | null>(null);
  const [timeoutSaveItem, setTimeoutSaveItem] = useState<NodeJS.Timeout | null>(
    null
  );
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

  // save every 15 seconds
  useEffect(() => {
    // use timeout
    if (timeoutSaveItem) {
      clearTimeout(timeoutSaveItem);
    }
    const t = setTimeout(async () => {
      await handleSave();
    }, 15000);
    setTimeoutSaveItem(t);

    return () => {
      if (timeoutSaveItem) {
        clearTimeout(timeoutSaveItem);
      }
    };
  }, [resumeData]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    if (!userData) {
      await fetch(`/api/resume/${userData?.email}`, {
        method: "POST",
        body: JSON.stringify(resumeData),
      });
    }
    setIsSaving(false);
  };

  return (
    <div className="w-3/4 mx-auto flex h-full py-2 gap-2">
      <div className="flex-1 flex flex-col h-full overflow-auto gap-2">
        <ScrollArea className="flex-1 overflow-auto">
          <ResumeEditor />
        </ScrollArea>
        <Adder />
      </div>
      <div className="w-fit border-2 border-black">
        <div className="flex flex-col items-end h-full">
          {/* preview part */}
          <div className="flex-1 overflow-auto">
            <Preview />
          </div>
          {/* bottom part */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end">
              <Link href="/preview">preview</Link>
              <Button
                onClick={() => {
                  setRecomputePreview(!recomputePreview);
                }}
                variant="outline"
              >
                refresh
              </Button>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
