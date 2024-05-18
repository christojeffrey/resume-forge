"use client";
import { Label } from "@/src/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";

import { Input } from "@/src/components/ui/input";
import { RichInput } from "@/src/components/ui/rich-input";
import { SectionType } from "@/src/lib/type";

export default function SectionEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom) as [
    SectionType,
    any,
  ];

  const handleChange = (
    value: any,
    type: "title" | "subtitle" | "date" | "moreInformation" | "details"
  ) => {
    setResumeData(prev => {
      const result = prev.map((item: any) => {
        if (item.id === itemEdited.id) {
          const newItem = {
            ...item,
            data: {
              ...item.data,
              [type]: value,
            },
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
      <div className="flex flex-col gap-2">
        {/* form */}
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          defaultValue={itemEdited.data.title}
          onChange={e => handleChange(e.target.value, "title")}
        />
        <Label htmlFor="subtitle">subtitle</Label>
        <Input
          id="subtitle"
          defaultValue={itemEdited.data.subtitle}
          onChange={e => handleChange(e.target.value, "subtitle")}
        />
        <Label htmlFor="date">date</Label>
        <Input
          id="date"
          defaultValue={itemEdited.data.date}
          onChange={e => handleChange(e.target.value, "date")}
        />
        <Label htmlFor="moreInformation">more information</Label>
        <Input
          id="moreInformation"
          defaultValue={itemEdited.data.moreInformation}
          onChange={e => handleChange(e.target.value, "moreInformation")}
        />
        <Label htmlFor="details">details</Label>
        <RichInput
          id="details"
          value={itemEdited.data.details.htmlValue}
          onChange={(htmlValue: string, objectValue: any) =>
            handleChange(
              {
                htmlValue: htmlValue,
                objectValue: objectValue,
              },
              "details"
            )
          }
        />
      </div>
    </>
  );
}
