"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function TitleEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);

  const handleTitleChange = (e: any) => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === itemEdited.id) {
          return {
            ...item,
            data: e.target.value,
          };
        }
        setItemEdited(item);
        return item;
      });
      return result;
    });
  };
  return (
    <>
      <Label htmlFor="title">title</Label>
      <Textarea
        id="title"
        value={itemEdited.data}
        onChange={handleTitleChange}
        placeholder="Title"
        className="text-2xl"
      />
    </>
  );
}
