"use client";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
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

export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function TurnToDraggable({ id, index, children, array }: any) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => {
        return (
          <>
            <div
              className="flex flex-col w-full mb-4 p-2 overflow-auto"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="flex w-full overflow-auto mb-2">
                <div {...provided.dragHandleProps}>
                  {/* <DraggableSVG /> */}
                  <div className="h-full bg-slate-200 hover:bg-slate-500 w-2 rounded-lg mx-2" />
                </div>

                <div className="flex-1 overflow-auto">{children}</div>
              </div>
              {/* if not the last, add separator */}
              {/* <Separator /> */}
            </div>
          </>
        );
      }}
    </Draggable>
  );
}
