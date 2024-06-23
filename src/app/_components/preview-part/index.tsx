"use client";
import ResumePreview from "./resume-preview";

export default function ResumePreviewPart() {
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
