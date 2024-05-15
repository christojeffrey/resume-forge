"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { UnprivilegedEditor } from "react-quill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

import "react-quill/dist/quill.snow.css";
import { Button } from "./button";
import { toast } from "sonner";
// only allow bold for now
export function RichInput({ value: initialValue, onChange }: any) {
  const [value, setValue] = useState(initialValue);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");

  const [paraphraseSuggestions, setParaphraseSuggestions] = useState<string[]>(
    []
  );

  function handleChangeSelection(
    selection: any,
    source: any,
    editor: UnprivilegedEditor
  ) {
    const range = editor.getSelection();
    if (range) {
      if (range.length === 0) {
        console.log("User cursor is at index", range.index);
      }
      if (range.length > 0) {
        setOpenPopover(true);
        const text = editor.getText(range.index, range.length);
        console.log("User has highlighted: ", text);
        setHighlightedText(text);
        setParaphraseSuggestions([]);
      }
    } else {
      console.log("User cursor is not in the editor");
    }
  }
  function handleChange(
    newValue: string,
    _delta: any,
    _source: any,
    editor: UnprivilegedEditor
  ) {
    setValue(newValue);
    const delta = editor.getContents();
    onChange(newValue, delta?.ops);
  }

  async function handleParaPhraseButtonClick() {
    // call api
    try {
      const response = await fetch("/api/ai/paraphrase", {
        method: "POST",
        body: JSON.stringify({
          resume: "resume",
          textToParaphrase: highlightedText,
        }),
      });
      const data = await response.json();
      console.log(data);
      setParaphraseSuggestions(data);
    } catch (e) {
      toast("fetch error!");
    }
  }
  return (
    <>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <ReactQuill
          onChangeSelection={handleChangeSelection}
          theme="snow"
          value={value}
          onChange={handleChange}
          formats={["bold"]}
          modules={{ toolbar: ["bold"] }}
        />
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          <div>{highlightedText}</div>
          <Button
            onClick={handleParaPhraseButtonClick}
            disabled={!highlightedText}
          >
            paraphrase!
          </Button>
          {/* paraphrase suggestion */}
          <div>
            {paraphraseSuggestions.map((suggestion, index) => (
              <div key={index}>{suggestion}</div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
