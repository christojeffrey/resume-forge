"use client";
import { Button } from "@/src/components/ui/button";
import ResumePreview from "./resume-preview";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  isSavingAtom,
  resumeDataAtom,
  resumesDataAtom,
  userAtom,
} from "@/src/store";

export default function ResumePreviewPart() {
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);
  const [resumeData] = useAtom(resumeDataAtom);
  const [resumesData, setResumesData] = useAtom(resumesDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);

  const [timeoutSaveItem, setTimeoutSaveItem] = useState<NodeJS.Timeout | null>(
    null
  );
  // save every 15 seconds
  useEffect(() => {
    // use timeout
    if (timeoutSaveItem) {
      console.log("clearing timeout");
      clearTimeout(timeoutSaveItem);
    }
    const t = setTimeout(
      async () => {
        await handleSave();
      },
      userData ? 15000 : 3000
    );
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
    localStorage.setItem("resumesData", JSON.stringify(resumesData));

    if (userData) {
      await fetch(`/api/resume/${userData?.email}`, {
        method: "POST",
        body: JSON.stringify(resumesData),
      });
    }
    toast("Saved!", { icon: "👍" });
    setIsSaving(false);
  };
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {/* preview part */}
      <div className="flex-1 overflow-auto">
        <ResumePreview />
      </div>
      {/* bottom part */}
      <div>
        <Button onClick={handleSave} disabled={isSaving} className="w-24">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          save
        </Button>
      </div>
    </div>
  );
}
