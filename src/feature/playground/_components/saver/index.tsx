"use client";
import { Button } from "@/src/components/ui/button";
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

export default function Saver() {
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);
  const [resumeData] = useAtom(resumeDataAtom);
  const [resumesData, setResumesData] = useAtom(resumesDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);
  const [doSchuduledSave, setDoScheduledSave] = useState(false);

  const [timeoutSaveItem, setTimeoutSaveItem] = useState<NodeJS.Timeout | null>(
    null
  );
  // save every 15 seconds
  useEffect(() => {
    // use timeout
    if (timeoutSaveItem) {
      clearTimeout(timeoutSaveItem);
    }
    const t = setTimeout(
      () => {
        if (!doSchuduledSave) {
          console.log("testing");
          setDoScheduledSave(true);
        }
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

  useEffect(() => {
    async function temp() {
      if (doSchuduledSave) {
        await handleSave();
        setDoScheduledSave(false);
      }
    }
    temp();
  }, [doSchuduledSave]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    localStorage.setItem("resumesData", JSON.stringify(resumesData));

    if (userData) {
      await fetch(`/api/resumes/${userData?.email}`, {
        method: "POST",
        body: JSON.stringify(resumesData),
      });
    }
    toast("Saved!", { icon: "👍" });
    setIsSaving(false);
  };
  return (
    <>
      <div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-24"
          variant="outline"
        >
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </>
  );
}
