"use client";
import { Button } from "@/src/components/ui/button";
import { currentItemEditedAtom, isEditingAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import DividerEditor from "../items/divider/editor";
import HeadingEditor from "../items/heading/editor";
import TitleEditor from "../items/title/editor";
import SectionEditor from "../items/section/editor";
import LinksEditor from "../items/links/editor";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { X } from "lucide-react";

// editor with common attribute
export default function ItemEditor() {
  const [, setResumeData] = useAtom(resumeDataAtom);
  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);
  const [, setIsEditing] = useAtom(isEditingAtom);    

  const handleDelete = () => {
    setResumeData(prev => {
      return prev.filter(item => item.id !== itemEdited?.id);
    });
    setItemEdited(null);
  };
  const toggleDraft = () => {
    setResumeData(prev => {
      const result = prev.map(item => {
        if (item.id === itemEdited?.id) {
          const newItem = {
            ...item,
            draft: !item.draft,
          };

          setItemEdited(newItem);
          return newItem;
        }
        return item;
      });
      return result;
    });
  };

  if (!itemEdited) return null;

  const Component = typeToEditor[itemEdited.type];

  return (
    <>
      <div
        onClick={() => {
          setItemEdited(null);
          setIsEditing(false);
        }}
        className="flex justify-end cursor-pointer"
      >
        <X className="w-6 h-6 " />
      </div>
      {/* editor */}
      {/* {itemEdited.type} */}
      {/* {itemEdited.id} */}
      {Component && <Component />}

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
