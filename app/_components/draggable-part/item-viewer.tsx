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
  const [, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );

  const toggleDraft = () => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === id) {
          const newItem = {
            ...item,
            draft: !item.draft,
          };
          // check if id them same
          if (currentItemEdited?.id === id) {
            setCurrentItemEdited(newItem);
          }
          return newItem;
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
    if (currentItemEdited?.id === id) {
      setCurrentItemEdited(null);
    }
  };

  function handleDoEdit() {
    // set currentIDEdited
    console.log("item", item);
    // setCurrentItemEdited(null);
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
              onClick={handleDoEdit}
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
          <ContextMenuItem onClick={handleDoEdit}>edit</ContextMenuItem>
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
