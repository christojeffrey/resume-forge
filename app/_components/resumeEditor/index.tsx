"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import Adder from "../adder";
import { Plus } from "lucide-react";
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

export function TurnToDraggable({
  id,
  index,
  children,
  array,
  className,
}: any) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => {
        return (
          <>
            <div
              className={`flex flex-col w-full p-2 overflow-auto ${className}`}
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
              {/* adder */}
              <div className="w-full h-4 px-8">
                <Adder location={index + 1}>
                  <div className="flex h-2 justify-center items-center group py-1">
                    <div className="bg-black h-[2px] w-full rounded-full group-hover:block hidden" />
                    <Plus className="group-hover:block hidden" />
                    <div className="bg-black h-[2px] w-full rounded-full group-hover:block hidden" />
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
