"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { UnprivilegedEditor } from "react-quill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const Component = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );

    Component.displayName = "ReactQuill";

    return Component;
  },
  {
    ssr: false,
  }
);
import "react-quill/dist/quill.snow.css";
import { Button } from "./button";
import { toast } from "sonner";
// only allow bold for now
export function RichInput({ value: initialValue, onChange }: any) {
  const [value, setValue] = useState(initialValue);
  const [openPopover, setOpenPopover] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedTextIndex, setHighlightedTextIndex] = useState(0);

  const [paraphraseSuggestions, setParaphraseSuggestions] = useState<string[]>(
    []
  );
  const quillRef = useRef<any>(null);

  function handleChangeSelection(
    selection: any,
    source: any,
    editor: UnprivilegedEditor
  ) {
    const range = editor.getSelection();
    if (range) {
      setParaphraseSuggestions([]);

      // if (range.length === 0) {
      //   // console.log("User cursor is at index", range.index);
      // }
      if (range.length > 0) {
        setOpenPopover(true);
        const text = editor.getText(range.index, range.length);
        // console.log("User has highlighted: ", text);
        setHighlightedText(text);
        setHighlightedTextIndex(range.index);
      }
    } else {
      // console.log("User cursor is not in the editor");
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

  function handleApplyParaphrase(suggestion: string) {
    quillRef.current
      .getEditor()
      .deleteText(highlightedTextIndex, highlightedText.length);
    quillRef.current.getEditor().insertText(highlightedTextIndex, suggestion);
  }
  async function handleParaphraseButtonClick() {
    // call api

    try {
      fetch("/api/ai/paraphrase", {
        method: "POST",
        body: JSON.stringify({
          textToParaphrase: highlightedText,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setParaphraseSuggestions(data);
        })
        .catch(e => {
          toast("fetch error!");
        });
    } catch (e) {
      toast("fetch error!");
    }
  }
  return (
    <>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <ReactQuill
          forwardedRef={quillRef}
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
            onClick={handleParaphraseButtonClick}
            disabled={!highlightedText}
          >
            paraphrase!
          </Button>
          {/* paraphrase suggestion */}
          <div>
            {paraphraseSuggestions.map((suggestion, index) => (
              <div key={index} className="flex">
                <div className="flex-1">{suggestion}</div>
                <Button
                  className="w-12"
                  variant="ghost"
                  onClick={() => handleApplyParaphrase(suggestion)}
                >
                  apply
                </Button>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
