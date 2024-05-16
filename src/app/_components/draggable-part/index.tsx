"use client";
import { useAtom } from "jotai";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { generateID, resumeDataAtom } from "@/src/store";
import {
  reorder,
  StrictModeDroppable,
  TurnToDraggable,
} from "./turn-to-draggable";
import { useState } from "react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import Adder from "../adder";
import { Button } from "@/src/components/ui/button";
import ItemViewer from "./item-viewer";
import { ResumeData, ResumeItem } from "@/src/lib/type";

export default function ResumeDraggablePart() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  return (
    <div className="flex flex-col justify-between h-full">
      <ScrollArea>
        <ResumeEditor />
      </ScrollArea>
      <Adder>
        <Button variant="outline">Add</Button>
      </Adder>
    </div>
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
