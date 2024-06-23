"use client";
import { Label } from "@/src/components/ui/label";
import { SectionType } from "@/src/lib/type";
import RichTextRenderer from "./rich-text-viewer";

export default function SectionViewer({ item }: { item: SectionType }) {
  return (
    <>
      <Label className="text-xs font-semibold text-slate-400">Section</Label>
      <h3 className="text-xl font-semibold">{item?.data?.title}</h3>
      <h4 className="text-lg font-semibold">{item?.data?.subtitle}</h4>
      <p>{item?.data?.date}</p>
      <p>{item?.data?.moreInformation}</p>
      <RichTextRenderer quillDelta={item?.data?.details?.objectValue} />
    </>
  );
}
