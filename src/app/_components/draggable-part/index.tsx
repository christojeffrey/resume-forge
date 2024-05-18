"use client";
import { useAtom } from "jotai";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { resumeDataAtom } from "@/src/store";
import {
  reorder,
  StrictModeDroppable,
  TurnToDraggable,
} from "./turn-to-draggable";
import { useState } from "react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import Adder from "../adder";
import ItemViewer from "./item-viewer";
import { ResumeItem } from "@/src/lib/type";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/src/components/ui/context-menu";

export default function ResumeDraggablePart() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  function handleRemoveAll() {
    setResumeData([]);
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex flex-col justify-between h-full">
          <ScrollArea className="flex-1">
            <ResumeEditor />
            <Adder>
              <div className="transition-all hover:opacity-100 opacity-0 bg-slate-200 rounded-xl text-slate-800 text-center p-8 m-4">
                ADD
              </div>
            </Adder>
          </ScrollArea>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleRemoveAll} className="text-red-500">
          Remove all
        </ContextMenuItem>
        {/* <ContextMenuItem>Add</ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  );
}

function ResumeEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [isAnyDragged, setIsAnyDragged] = useState(false);
  function handleDragStart() {
    setIsAnyDragged(true);
  }
  function onDragEnd(result: DropResult) {
    setIsAnyDragged(false);
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newResumeData = reorder(
      resumeData,
      result.source.index,
      result.destination.index
    );
    setResumeData(newResumeData);
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={handleDragStart}>
        <StrictModeDroppable droppableId="list">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex w-full flex-col"
            >
              {resumeData.map((item: ResumeItem, index: number) => {
                const { id } = item;
                return (
                  <>
                    <TurnToDraggable
                      id={id}
                      index={index}
                      key={id}
                      className=""
                      isAnyDragged={isAnyDragged}
                    >
                      <ItemViewer id={id} />
                    </TurnToDraggable>
                  </>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </>
  );
}
