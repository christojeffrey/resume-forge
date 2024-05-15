"use client";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

export default function HeadingEditor() {
  const [, setResumeData] = useAtom(resumeDataAtom);

  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);

  const handleHeadingChange = (e: any) => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === itemEdited.id) {
          const newItem = {
            ...item,
            data: e.target.value,
          };
          setItemEdited(newItem);
          return newItem;
        }
        return item;
      });
      return result;
    });
  };

  return (
    <>
      <Label htmlFor="heading">heading</Label>
      <Textarea
        id="heading"
        value={itemEdited.data}
        onChange={handleHeadingChange}
        placeholder="Heading"
        className="text-2xl"
      />
    </>
  );
}
