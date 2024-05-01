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
              className="mb-4 p-4"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="flex">
                <div {...provided.dragHandleProps}><DraggableSVG/></div>
                {children}
              </div>
              {/* if not the last, add separator */}
              <Separator />
            </div>
          </>
        );
      }}
    </Draggable>
  );
}

function DraggableSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <g>
            <path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z" />
          </g>
        </g>
      </g>
    </svg>
  );
}
