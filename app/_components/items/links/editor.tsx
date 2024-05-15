"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

export default function LinksEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);

  function handleDelete(index: number) {
    setResumeData((prev: any) => {
      const result = prev.map((tempItem: any) => {
        if (tempItem.id === itemEdited.id) {
          const newItem = {
            ...tempItem,
            data: tempItem.data.filter((_: any, i: number) => i !== index),
          };
          setItemEdited(newItem);
          return newItem;
        }
        return tempItem;
      });
      return result;
    });
  }
  function handleChange(type: "text" | "href", value: string, index: number) {
    setResumeData((prev: any) => {
      const result = prev.map((tempItem: any) => {
        if (tempItem.id === itemEdited.id) {
          const newItem = {
            ...tempItem,
            data: tempItem.data.map((link: any, i: number) => {
              if (i === index) {
                return {
                  ...link,
                  [type]: value,
                };
              }
              return link;
            }),
          };
          setItemEdited(newItem);
          return newItem;
        }
        return tempItem;
      });
      return result;
    });
  }

  return (
    <>
      <Label htmlFor="link">links</Label>
      <div className="flex flex-col gap-2">
        {itemEdited.data.map((link: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              id="link"
              placeholder="text"
              value={link.text}
              onChange={e => {
                handleChange("text", e.target.value, index);
              }}
            />
            <Input
              id="link"
              placeholder="link"
              value={link.href}
              onChange={e => {
                handleChange("href", e.target.value, index);
              }}
            />
            {/* delete button */}
            <Button
              onClick={() => {
                handleDelete(index);
              }}
            >
              delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
