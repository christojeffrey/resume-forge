"use client";

import { Textarea } from "@/src/components/ui/textarea";

import { Label } from "@/src/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";
import { HeadingType } from "@/src/lib/type";

export default function HeadingEditor() {
  const [, setResumeData] = useAtom(resumeDataAtom);

  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom) as [
    HeadingType,
    any,
  ];

  const handleHeadingChange = (e: any) => {
    setResumeData(prev => {
      const result = prev.map(item => {
        if (item.id === itemEdited?.id) {
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
