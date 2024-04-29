"use client"
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyComponent() {
  const [value, setValue] = useState("");
  const ref = useRef<any>();
  console.log(value);
  console.log(ref.current?.unprivilegedEditor?.getContents());
  return (
    <ReactQuill ref={ref} theme="snow" value={value} onChange={setValue} />
  );
}

export default function Item({ data, id }: any) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );
  return (
    <div>
      <MyComponent />
      <h3>{data.title}</h3>
      <h4>{data.subtitle}</h4>
      <p>{data.date}</p>
      <p>{data.moreInformation}</p>
      <ul>
        {data.details.map((detail: string, index: number) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
