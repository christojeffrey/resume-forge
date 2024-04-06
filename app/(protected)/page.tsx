"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
// main page
const hardCodedItems = [
  { id: "1", content: "testing1" },
  { id: "2", content: "testing2" },
  { id: "3", content: "testing3" },
];
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
const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  };

  return custom;
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({ quote, index }) {
  return (
    <div className="border-2 border-red-400 p-2 m-2">
      <Draggable draggableId={quote.id} index={index}>
        {(provided) => (
          <div className="w-[200px] border-2 border-black mb-4 p-4" ref={provided.innerRef} {...provided.draggableProps}>
            <div {...provided.dragHandleProps}>handle</div>
            {quote.content}
          </div>
        )}
      </Draggable>
    </div>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index: number) => <Quote quote={quote} index={index} key={quote.id} />);
});

function QuoteApp() {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(state.quotes, result.source.index, result.destination.index);

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
export default function Home() {
  return (
    <div className="h-full">
      <div>testing</div>
      <div className="mx-auto w-fit">
        <QuoteApp />
      </div>
    </div>
  );
}
