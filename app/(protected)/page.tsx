"use client";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DroppableProps } from "react-beautiful-dnd";
import Preview from "./_components/preview";
import { Button } from "@/components/ui/button";
// main page
const hardCodedData = [
  {
    type: "title",
    data: "Jeffrey",
  },
  {
    type: "links",
    data: [
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
    ],
  },
  {
    type: "heading",
    data: "Education",
  },
  {
    type: "item",
    data: {
      title: "Bachelor of Science in Computer Science",
      subtitle: "University of the Philippines Los Baños",
      date: "2018-2022",
      moreInformation: "GPA: 3.00/4.00",
      details: ["lorem ipsum", "lorem ipsum", "lorem ipsum"],
    },
  },
  {
    type: "divider",
  },
];

const generateRandomID = (data: any[]) => {
  return data.map((item, index) => {
    return {
      ...item,
      id: `id-${index}`,
    };
  });
};
export const resumeDataAtom = atom(generateRandomID(hardCodedData));
export const recomputePreviewAtom = atom(true);

const Title = ({ data }: any) => {
  return <h1>{data}</h1>;
};
const Links = ({ data }: any) => {
  return (
    <div>
      {data.map((link: any, index: number) => (
        <a href={link.href} key={index}>
          {link.text}
        </a>
      ))}
    </div>
  );
};

const Heading = ({ data }: any) => {
  return <h2>{data}</h2>;
};

const Item = ({ data }: any) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <h4>{data.subtitle}</h4>
      <p>{data.date}</p>
      <p>{data.moreInformation}</p>
      <ul>
        {data.details.map((detail: string, index: number) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};
const Divider = () => {
  return <hr />;
};
const typeToComponents = [
  { type: "title", component: Title },
  { type: "links", component: Links },
  { type: "heading", component: Heading },
  { type: "item", component: Item },
  { type: "divider", component: Divider },
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

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function TurnToDraggable({ id, index, children }: any) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div className="w-full border-2 border-black mb-4 p-4" ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps}>handle</div>
          {children}
        </div>
      )}
    </Draggable>
  );
}

function QuoteApp() {
  const [data, setData] = useAtom(resumeDataAtom);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newData = reorder(data, result.source.index, result.destination.index);
    setData(newData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((item, index) => {
              const { type, data, id } = item;
              const Component = typeToComponents.find((component) => component.type === type)?.component;
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
export default function Home() {
  const [recomputePreview, setRecomputePreview] = useAtom(recomputePreviewAtom);
  return (
    <div className="relative h-full">
      <div className="w-1/2 mx-auto">
        <QuoteApp />
      </div>
      <Button
        onClick={() => {
          setRecomputePreview(!recomputePreview);
        }}
      >
        recompute
      </Button>
      <div className="absolute right-0 top-0 p-8">
        <Preview />
      </div>
    </div>
  );
}
