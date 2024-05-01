import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { CommonEditor } from "./CommonEditor";

function View({ item }: { item: any }) {
  return (
    <div>
      <Label className="text-xs font-semibold text-slate-400">title</Label>
      <h1 className="text-3xl font-bold">{item.data}</h1>
    </div>
  );
}
function Editor({
  item,
  handleTitleChange,
}: {
  item: any;
  handleTitleChange: any;
}) {
  return (
    <>
      <Label htmlFor="title">title</Label>
      <Textarea
        id="title"
        value={item.data}
        onChange={handleTitleChange}
        placeholder="Title"
        className="text-2xl"
      />
    </>
  );
}
export default function Title({ id }: { id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  useEffect(() => {
    setItem(resumeData.find((item: any) => item.id === id));
  }, [resumeData]);

  const handleTitleChange = (e: any) => {
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            data: e.target.value,
          };
        }
        return item;
      });
      return result;
    });
  };

  return (
    <CommonEditor
      id={id}
      item={item}
      View={View({ item: item })}
      Editor={Editor({ item: item, handleTitleChange: handleTitleChange })}
    />
  );
}
