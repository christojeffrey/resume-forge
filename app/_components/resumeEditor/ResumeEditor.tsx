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
    <>
      {/* first attempt */}

      {/* <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <div className="bg-blue-50 h-[200vh]">
            long page
            <div className="flex border-2 border-black overflow-auto">
              <div className="flex-1 overflow-auto">
                <div className="overflow-auto w-[50vw] bg-blue-50">
                  longpart
                </div>
              </div>
              <div className="w-24 bg-white">right part</div>
            </div>
          </div>
        </div>
        <div>button</div>
      </div> */}
      <DragDropContext onDragEnd={onDragEnd}>
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
                  // <div
                  //   key={id}
                  //   className=" w-full flex border-2 border-black overflow-auto"
                  // >
                  //   {/* long */}
                  //   <div className="flex-1 overflow-auto">
                  //     <div className="overflow-auto w-screen bg-blue-50">
                  //       longpart
                  //     </div>
                  //   </div>
                  //   {/* right */}
                  //   <div className="w-24 bg-white">right part</div>
                  // </div>
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
    </>
  );
}
