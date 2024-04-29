"use client";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// only allow bold for now
function RichInput({ value: initialValue, onChange }: any) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef<any>();

  function handleChange(newValue: string) {
    setValue(newValue);
    const delta = ref.current?.unprivilegedEditor?.getContents();
    onChange(newValue, delta?.ops);
    console.log(newValue, delta?.ops);
  }
  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      value={value}
      onChange={handleChange}
      formats={["bold"]}
      modules={{ toolbar: ["bold"] }}
    />
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
export default function Section({ id }: any) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [sectionItem, setSectionItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  const handleChange = (
    value: any,
    type: "title" | "subtitle" | "date" | "moreInformation" | "details"
  ) => {
    setResumeData(prev => {
      const result = prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            data: {
              ...item.data,
              [type]: value,
            },
          };
        }
        return item;
      });
      setSectionItem(result.find((item: any) => item.id === id));
      return result;
    });
  };
  return (
    <div className="mb-2 w-full">
      <Dialog>
        {/* view */}
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex justify-between w-full">
              {/* right click trigger */}
              <div>
                <Label className="text-xs font-semibold text-slate-400">
                  Section
                </Label>
                <h3>{sectionItem.data.title}</h3>
                <h4>{sectionItem.data.subtitle}</h4>
                <p>{sectionItem.data.date}</p>
                <p>{sectionItem.data.moreInformation}</p>
                <ObjectValueRenderer
                  value={sectionItem.data.details.objectValue}
                />
              </div>
              {/* trigger */}
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
            </div>
          </ContextMenuTrigger>
          {/* right click content */}
          <ContextMenuContent>
            <DialogTrigger asChild>
              <ContextMenuItem>edit</ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        {/* edit */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                {/* form */}
                <Label htmlFor="title">title</Label>
                <Input
                  id="title"
                  value={sectionItem.data.title}
                  onChange={e => handleChange(e.target.value, "title")}
                />
                <Label htmlFor="subtitle">subtitle</Label>
                <Input
                  id="subtitle"
                  value={sectionItem.data.subtitle}
                  onChange={e => handleChange(e.target.value, "subtitle")}
                />
                <Label htmlFor="date">date</Label>
                <Input
                  id="date"
                  value={sectionItem.data.date}
                  onChange={e => handleChange(e.target.value, "date")}
                />
                <Label htmlFor="moreInformation">more information</Label>
                <Input
                  id="moreInformation"
                  value={sectionItem.data.moreInformation}
                  onChange={e =>
                    handleChange(e.target.value, "moreInformation")
                  }
                />
                <Label htmlFor="details">details</Label>
                <RichInput
                  id="details"
                  value={sectionItem.data.details.htmlValue}
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
                {/* draft */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="draft"
                    checked={sectionItem.draft}
                    onCheckedChange={_ => {
                      setResumeData(prev => {
                        const result = prev.map(item => {
                          if (item.id === id) {
                            return {
                              ...item,
                              draft: !item.draft,
                            };
                          }
                          return item;
                        });
                        setSectionItem(
                          result.find((item: any) => item.id === id)
                        );
                        return result;
                      });
                    }}
                  />
                  <Label
                    htmlFor="draft"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    draft
                  </Label>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const example = [
  {
    insert: "asfasdf ",
  },
  {
    attributes: {
      bold: true,
    },
    insert: "asfsadf",
  },
  {
    insert: "\n",
  },
];
function ObjectValueRenderer({ value }: { value: any[] }) {
  return (
    <>
      {value.map((item: any, index: number) => (
        <>
          {item.attributes?.bold ? (
            <span className="font-bold">{item.insert}</span>
          ) : (
            item.insert
              .split("\n")
              .map((line: string, i: number, array: string[]) => {
                return (
                  <>
                    <span key={i} className="text-md">
                      {line}
                    </span>
                    {i !== array.length - 1 && <br />}
                  </>
                );
              })
          )}
        </>
      ))}
    </>
  );
}
