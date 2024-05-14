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
import { editingComponentAtom, isEditingAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function CommonEditor({
  id,
  item,
  View,
  Editor,
}: {
  id: string;
  item: any;
  View: React.ReactNode;
  Editor: React.ReactNode;
}) {
  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [editingComponent, setEditingComponent] = useAtom(editingComponentAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  const toggleDraft = () => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            draft: !item.draft,
          };
        }
        return item;
      });
      return result;
    });
  };

  const handleDelete = () => {
    setResumeData((prev: any) => {
      return prev.filter((item: any) => item.id !== id);
    });
    setEditingComponent(null);
  };

  function handleEditButtonClick() {
    setEditingComponent(
      EditorWithCommonAttribute({
        editor: Editor,
        item: item,
        toggleDraft: toggleDraft,
        handleDelete: handleDelete,
      })
    );
    setIsEditing(true);
  }
  return (
    <>
      {/* view */}
      <ContextMenu>
        {/* right click trigger */}
        <ContextMenuTrigger className="w-full">
          <div className="flex flex-row justify-between w-full group">
            {/* fill */}
            <div
              onClick={handleEditButtonClick}
              className={`flex-1 overflow-auto group ${item.draft ? "opacity-20" : ""}`}
            >
              {View}
            </div>
            {/* icons */}
            {item.draft ? (
              <EyeOff
                className="size-5 group-hover:opacity-100 opacity-50"
                onClick={() => {
                  toggleDraft();
                }}
              />
            ) : (
              <Eye
                className="size-5 group-hover:opacity-100 opacity-50"
                onClick={() => {
                  toggleDraft();
                }}
              />
            )}
          </div>
        </ContextMenuTrigger>
        {/* right click content */}
        <ContextMenuContent>
          <ContextMenuItem onClick={handleEditButtonClick}>
            edit
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDelete}>delete</ContextMenuItem>
          <ContextMenuItem onClick={toggleDraft}>
            {item.draft ? "show on resume" : "turn to draft"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

function EditorWithCommonAttribute({
  editor,
  item,
  toggleDraft,
  handleDelete,
}: {
  editor: React.ReactNode;
  item: any;
  toggleDraft: () => void;
  handleDelete: () => void;
}) {
  console.log("testing");

  return (
    <>
      {editor}
      <div className="flex flex-col gap-2 mt-2">
        {/* common editor */}
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex gap-2">
            {/* <Checkbox
              id="draft"
              defaultChecked={item.draft}
              checked={item.draft}
              onCheckedChange={toggleDraft}
            />
            <Label
              htmlFor="draft"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              draft
            </Label> */}
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
