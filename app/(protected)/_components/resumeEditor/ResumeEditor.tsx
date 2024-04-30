"use client";
import { useAtom } from "jotai";
import { DragDropContext } from "react-beautiful-dnd";
import { typeToComponents } from "./_components";
import { resumeDataAtom } from "@/store";
import { reorder, StrictModeDroppable, TurnToDraggable } from ".";

export function ResumeEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  function onDragEnd(result: any) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {resumeData.map((item: any, index: number, array: any[]) => {
              const { type, id } = item;
              const Component = typeToComponents.find(
                component => component.type === type
              )?.component;
              if (!Component) {
                return null;
              }
              return (
                <TurnToDraggable id={id} index={index} key={id} array={array}>
                  <Component id={id} />
                </TurnToDraggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
