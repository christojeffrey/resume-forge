"use client";
import { useAtom } from "jotai";
import Preview from "./_components/resumePreview";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "./_components/resumeEditor";
import { recomputePreviewAtom } from "@/store";
// main page





export default function Home() {
  const [recomputePreview, setRecomputePreview] = useAtom(recomputePreviewAtom);
  return (
    <div className="relative h-full">
      <div className="w-1/2 mx-auto">
        <ResumeEditor />
      </div>
      <Button
        onClick={() => {
          setRecomputePreview(!recomputePreview);
        }}
      >
        recompute
      </Button>
      <div className="absolute right-0 top-0 p-8">
        <Preview />
      </div>
    </div>
  );
}
