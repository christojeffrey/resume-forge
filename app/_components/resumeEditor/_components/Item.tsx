"use client";
import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

// only allow bold for now
function RichInput({ value: initialValue, onChange }: any) {
  const [value, setValue] = useState(initialValue);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  function handleChange(
    newValue: string,
    _delta: any,
    _source: any,
    editor: any
  ) {
    setValue(newValue);
    const delta = editor.getContents();
    onChange(newValue, delta?.ops);
  }

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      formats={["bold"]}
      modules={{ toolbar: ["bold"] }}
    />
  );
}

import { Label } from "@/components/ui/label";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { CommonEditor } from "./CommonEditor";

function View({ item }: any) {
  return (
    <>
      <Label className="text-xs font-semibold text-slate-400">Section</Label>
      <h3 className="text-xl font-semibold">{item.data.title}</h3>
      <h4 className="text-lg font-semibold">{item.data.subtitle}</h4>
      <p>{item.data.date}</p>
      <p>{item.data.moreInformation}</p>
      <ObjectValueRenderer value={item.data.details.objectValue} />
    </>
  );
}

function Editor({ item, handleChange }: any) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* form */}
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          value={item.data.title}
          onChange={e => handleChange(e.target.value, "title")}
        />
        <Label htmlFor="subtitle">subtitle</Label>
        <Input
          id="subtitle"
          value={item.data.subtitle}
          onChange={e => handleChange(e.target.value, "subtitle")}
        />
        <Label htmlFor="date">date</Label>
        <Input
          id="date"
          value={item.data.date}
          onChange={e => handleChange(e.target.value, "date")}
        />
        <Label htmlFor="moreInformation">more information</Label>
        <Input
          id="moreInformation"
          value={item.data.moreInformation}
          onChange={e => handleChange(e.target.value, "moreInformation")}
        />
        <Label htmlFor="details">details</Label>
        <RichInput
          id="details"
          value={item.data.details.htmlValue}
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
export default function Section({ id }: any) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );
  useEffect(() => {
    setItem(resumeData.find((item: any) => item.id === id));
  }, [resumeData]);

  const handleChange = (
    value: any,
    type: "title" | "subtitle" | "date" | "moreInformation" | "details"
  ) => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
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
      return result;
    });
  };
  return (
    <CommonEditor
      id={id}
      item={item}
      View={View({ item })}
      Editor={Editor({ item, handleChange })}
    />
  );
}

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
