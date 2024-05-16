"use client";
import { currentItemEditedAtom, isEditingAtom } from "@/src/store";
import { useAtom } from "jotai";
import ItemEditor from "./item-editor";
import { X } from "lucide-react";

export default function ResumeEditorPart() {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [itemEdited, setItemEdited] = useAtom(currentItemEditedAtom);

  if (itemEdited === null) return <>nothing is being edited!</>;
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

      <div
        className={`transition-opacity ease-in duration-300 ${isEditing ? "opacity-100" : "opacity-0"}`}
      >
        <ItemEditor />
      </div>
    </>
  );
}
