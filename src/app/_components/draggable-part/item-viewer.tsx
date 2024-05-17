"use client";
import { currentItemEditedAtom, resumeDataAtom } from "@/src/store";
import DividerViewer from "../items/divider/viewer";
import HeadingViewer from "../items/heading/viewer";
import LinksViewer from "../items/links/viewer";
import SectionViewer from "../items/section/viewer";
import TitleViewer from "../items/title/viewer";
import { useAtom } from "jotai";
import { isEditingAtom } from "@/src/store";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/src/components/ui/context-menu";
import { Eye, EyeOff } from "lucide-react";
import { ResumeData, ResumeItem } from "@/src/lib/type";
import DividerEditor from "../items/divider/editor";
import HeadingEditor from "../items/heading/editor";
import TitleEditor from "../items/title/editor";
import SectionEditor from "../items/section/editor";
import LinksEditor from "../items/links/editor";
import ItemEditor from "./item-editor";
import { getID } from "../adder";

export default function ItemViewerAndEditor({ id }: { id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );
  const item = resumeData.find((item: ResumeItem) => item.id === id) ?? null;

  if (!item) return null;

  return isEditing && currentItemEdited?.id === item.id ? (
    <>
      <ItemEditor />
    </>
  ) : (
    <>
      <ItemViewer id={id} />
    </>
  );
}
export function ItemViewer({ id }: { id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const item = resumeData.find((item: ResumeItem) => item.id === id) ?? null;
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );

  const toggleDraft = () => {
    setResumeData((prev: ResumeData) => {
      const result = prev.map(item => {
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
    setResumeData(prev => {
      return prev.filter(item => item.id !== id);
    });
    if (currentItemEdited?.id === id) {
      setCurrentItemEdited(null);
    }
  };

  function handleDoEdit() {
    setCurrentItemEdited(item);
    setIsEditing(true);
  }

  function handleDuplicateBelow() {
    const index = resumeData.findIndex(i => i.id === id);
    let newItem = { ...item } as ResumeItem;
    newItem = getID(newItem, resumeData.length);
    setResumeData(prev => {
      const result = [...prev];
      result.splice(index + 1, 0, newItem);
      return result;
    });
  }
  function handleRemoveAll() {
    setResumeData([]);
  }

  if (!item) return null;

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
              className={`flex-1 overflow-auto group ${item?.draft ? "opacity-20" : ""}`}
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
          <ContextMenuItem onClick={handleDuplicateBelow}>
            duplicate below
          </ContextMenuItem>
          <ContextMenuItem onClick={handleRemoveAll} className="text-red-500">
            remove all
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
const typeToDraggableItem: {
  [key: string]: (props: { item: any }) => JSX.Element;
} = {
  divider: DividerViewer,
  heading: HeadingViewer,
  title: TitleViewer,
  section: SectionViewer,
  links: LinksViewer,
};

const typeToEditor: {
  [key: string]: () => JSX.Element;
} = {
  divider: DividerEditor,
  heading: HeadingEditor,
  title: TitleEditor,
  section: SectionEditor,
  links: LinksEditor,
};
