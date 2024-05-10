"use client";
import { useAtom } from "jotai";
import { typeToComponents } from "./_components";
import { resumeDataAtom } from "@/store";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

export function ResumeEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = resumeData.indexOf(active.id);
      const newIndex = resumeData.indexOf(over.id);
      console.log("oldIndex");
      console.log(active);
      console.log("newIndex");
      console.log(over);

      let newResumeData = arrayMove(resumeData, oldIndex, newIndex);
      console.log("newResumeData");
      console.log(newResumeData);
      setResumeData(newResumeData);
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={resumeData}
        strategy={verticalListSortingStrategy}
      >
        {resumeData.map((item: any, index: number) => {
          const { type, id: itemID } = item;
          const Component = typeToComponents.find(
            component => component.type === type
          )?.component;
          if (!Component) {
            return null;
          }
          return (
            <SortableItem key={index} id={index}>
              <div className="border-b-2 border-black">
                <Component id={itemID} />
              </div>
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
}
