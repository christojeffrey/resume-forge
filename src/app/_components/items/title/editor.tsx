"use client";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { TitleType } from "@/src/lib/type";
import { currentItemEditedAtom, resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";

export default function TitleEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom) as [
    TitleType,
    any,
  ];

  const handleTitleChange = (e: any) => {
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
