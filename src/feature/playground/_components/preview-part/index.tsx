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
  const [resumeData] = useAtom(resumeDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {/* preview part */}
      <div className="flex-1 overflow-auto">
        <ResumePreview />
      </div>
      {/* bottom part */}
    </div>
  );
}
