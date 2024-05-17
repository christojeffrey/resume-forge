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
import { Loader2, PenLine } from "lucide-react";
import { Separator } from "./separator";
// only allow bold for now
export function RichInput({ value: initialValue, onChange }: any) {
  const [value, setValue] = useState(initialValue);
  const [openPopover, setOpenPopover] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedTextIndex, setHighlightedTextIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [paraphraseSuggestions, setParaphraseSuggestions] = useState<string[]>([
    "a",
    "b",
  ]);
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
    setOpenPopover(false);
  }
  async function handleParaphraseButtonClick() {
    // call api
    setIsLoading(true);
    try {
      const data = await fetch("/api/ai/paraphrase", {
        method: "POST",
        body: JSON.stringify({
          textToParaphrase: highlightedText,
        }),
      });
      if (!data.ok) {
        throw new Error("fetch error!");
      }
      const json = await data.json();
      setParaphraseSuggestions(json);
    } catch (e) {
      toast("fetch error!");
    }
    setIsLoading(false);
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
        <PopoverContent className="w-96 flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="text-xs text-slate-700">{highlightedText}</div>
            <Button
              className="w-36"
              onClick={handleParaphraseButtonClick}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "paraphrase!"}
            </Button>
          </div>

          {/* paraphrase suggestion */}
          {paraphraseSuggestions.length !== 0 && (
            <>
              <Separator className="mb-2" />
              <div className="flex flex-col gap-2">
                {paraphraseSuggestions.map((suggestion, index) => (
                  <div key={index} className="">
                    <div
                      className="w-full text-left flex justify-between p-4 hover:bg-slate-100 rounded-xl cursor-pointer"
                      onClick={() => handleApplyParaphrase(suggestion)}
                    >
                      <div className="flex-1">{suggestion}</div>
                      <PenLine />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
