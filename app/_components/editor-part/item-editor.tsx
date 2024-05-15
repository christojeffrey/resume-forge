"use client";
import { Button } from "@/components/ui/button";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import DividerEditor from "../items/divider/editor";
import HeadingEditor from "../items/heading/editor";
import TitleEditor from "../items/title/editor";
import SectionEditor from "../items/section/editor";
import LinksEditor from "../items/links/editor";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// editor with common attribute
export default function ItemEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);

  const handleDelete = () => {
    setResumeData((prev: any) => {
      return prev.filter((item: any) => item.id !== itemEdited.id);
    });
    setItemEdited(null);
  };
  const toggleDraft = () => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === itemEdited.id) {
          return {
            ...item,
            draft: !item.draft,
          };
        }
        setItemEdited(item);
        return item;
      });
      return result;
    });
  };

  if (!itemEdited) return null;
  return (
    <>
      {/* editor */}
      {itemEdited.type}
      {/* <div>{typeToEditor[itemEdited.type]()}</div> */}
      testing
      <div className="flex flex-col gap-2 mt-2">
        {/* common editor */}
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex gap-2">
            <Checkbox
              id="draft"
              defaultChecked={itemEdited.draft}
              checked={itemEdited.draft}
              onCheckedChange={toggleDraft}
            />
            <Label
              htmlFor="draft"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              draft
            </Label>
          </div>
          {/* delete */}
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
          {/* <Button onClick={() => {}}>suggest!</Button> */}
        </div>
      </div>
    </>
  );
}

const typeToEditor: {
  [key: string]: () => JSX.Element;
} = {
  divider: DividerEditor,
  heading: HeadingEditor,
  title: TitleEditor,
  section: SectionEditor,
  links: LinksEditor,
};
