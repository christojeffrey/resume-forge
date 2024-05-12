"use client";
import { useAtom } from "jotai";
import { DragDropContext } from "react-beautiful-dnd";
import { typeToComponents } from "./_components";
import { resumeDataAtom } from "@/store";
import { reorder, StrictModeDroppable, TurnToDraggable } from ".";
import { useState } from "react";

export function ResumeEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const [isAnyDragged, setIsAnyDragged] = useState(false);
  function handleDragStart() {
    setIsAnyDragged(true);
  }
  function onDragEnd(result: any) {
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
              {resumeData.map((item: any, index: number, array: any[]) => {
                const { type, id } = item;
                const Component = typeToComponents.find(
                  component => component.type === type
                )?.component;
                if (!Component) {
                  return null;
                }
                return (
                  <>
                    <TurnToDraggable
                      id={id}
                      index={index}
                      key={id}
                      array={array}
                      className=""
                      isAnyDragged={isAnyDragged}
                    >
                      <Component id={id} />
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
