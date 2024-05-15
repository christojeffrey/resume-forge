"use client";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import DividerViewer from "../items/divider/viewer";
import HeadingViewer from "../items/heading/viewer";
import LinksViewer from "../items/links/viewer";
import SectionViewer from "../items/section/viewer";
import TitleViewer from "../items/title/viewer";
import { useAtom } from "jotai";
import { isEditingAtom } from "@/store";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eye, EyeOff } from "lucide-react";

export default function ItemViewer({ id }: { id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const item = resumeData.find((item: any) => item.id === id);
  console.log("item:", JSON.stringify(item, null, 2));
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );

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
    // set id editing
    setCurrentItemEdited(null);
  };

  function handleEditButtonClick() {
    // set currentIDEdited
    setCurrentItemEdited(item);
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
              {typeToDraggableItem[item.type]({ item })}
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
const typeToDraggableItem: {
  [key: string]: any;
} = {
  divider: DividerViewer,
  heading: HeadingViewer,
  title: TitleViewer,
  section: SectionViewer,
  links: LinksViewer,
};
