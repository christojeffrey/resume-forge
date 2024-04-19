"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
} from "react-beautiful-dnd";
import { typeToComponents } from "./_components";
import { resumeDataAtom } from "@/store";
// main page

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function TurnToDraggable({ id, index, children }: any) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="w-full border-2 border-black mb-4 p-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>handle</div>
          {children}
        </div>
      )}
    </Draggable>
  );
}

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
            {resumeData.map((item, index) => {
              const { type, data, id } = item;
              const Component = typeToComponents.find(
                component => component.type === type
              )?.component;
              if (!Component) {
                return null;
              }
              return (
                <TurnToDraggable id={id} index={index} key={id}>
                  <Component data={data} />
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
