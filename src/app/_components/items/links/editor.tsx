"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { LinksType } from "@/src/lib/type";
import { currentItemEditedAtom, resumeDataAtom } from "@/src/store";
import { useAtom } from "jotai";

export default function LinksEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom) as [
    LinksType,
    any,
  ];

  function handleAdd() {
    setResumeData((prev: any) => {
      const result = prev.map((tempItem: any) => {
        if (tempItem.id === itemEdited.id) {
          const newItem = {
            ...tempItem,
            data: [
              ...tempItem.data,
              {
                text: "linkedin",
                href: "https://linkedin.com/in/username",
              },
            ],
          };
          setItemEdited(newItem);
          return newItem;
        }
        return tempItem;
      });
      return result;
    });
  }
  function handleDelete(index: number) {
    setResumeData(prev => {
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
        {itemEdited.data.map((link, index) => (
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
        <Button variant="ghost" onClick={handleAdd}>
          add
        </Button>
      </div>
    </>
  );
}
