"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import "react-quill/dist/quill.snow.css";
// only allow bold for now
export function RichInput({ value: initialValue, onChange }: any) {
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
