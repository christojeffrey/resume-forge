"use client";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function HeadingEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [item, setItem] = useAtom(currentItemEditedAtom);

  const handleHeadingChange = (e: any) => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === item.id) {
          return {
            ...item,
            data: e.target.value,
          };
        }
        setItem(item);
        return item;
      });
      return result;
    });
  };
  console.log("item from heading", JSON.stringify(item, null, 2));

  return (
    <>
      <Label htmlFor="heading">heading</Label>
      <Textarea
        key="heading"
        id="heading"
        value={item.data}
        onChange={handleHeadingChange}
        placeholder="Heading"
        className="text-2xl"
      />
    </>
  );
}
