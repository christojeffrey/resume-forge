"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import Adder from "../adder";
import { Plus } from "lucide-react";
import { ResumeData } from "@/src/lib/type";
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

export const reorder = (list: ResumeData, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function TurnToDraggable({
  id,
  index,
  children,
  className,
  isAnyDragged = false,
}: any) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <div
              className={`flex flex-col w-full p-2 overflow-auto group/whole-draggable ${className}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="flex w-full overflow-auto mb-2">
                <div {...provided.dragHandleProps}>
                  <div
                    className={`h-full  w-2 rounded-lg mx-2 ${snapshot.isDragging ? "bg-slate-500" : "group-hover/whole-draggable:bg-slate-200"}`}
                  />
                </div>

                <div className="flex-1 overflow-auto">{children}</div>
              </div>
              {/* adder */}
              <div className={`w-full h-4 px-8`}>
                <Adder location={index + 1}>
                  <div className="flex h-2 justify-center items-center group py-1">
                    <div
                      className={`bg-black h-[2px] w-full rounded-full ${isAnyDragged ? "" : "group-hover:block"}  hidden`}
                    />
                    <Plus
                      className={`${isAnyDragged ? "" : "group-hover:block"} hidden`}
                    />
                    <div
                      className={`bg-black h-[2px] w-full rounded-full ${isAnyDragged ? "" : "group-hover:block"}  hidden`}
                    />
                  </div>
                </Adder>
              </div>
            </div>
          </>
        );
      }}
    </Draggable>
  );
}
