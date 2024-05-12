import { Label } from "@/components/ui/label";
import { CommonEditor } from "./CommonEditor";
import { useAtom } from "jotai";
import { resumeDataAtom } from "@/store";
import { useEffect, useState } from "react";

export default function Divider({ id }: { id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  useEffect(() => {
    setItem(resumeData.find((item: any) => item.id === id));
  }, [resumeData]);

  return (
    <>
      <CommonEditor
        id={id}
        item={item}
        View={
          <Label className="text-xs font-semibold text-slate-400">
            divider
          </Label>
        }
        Editor={<></>}
      />
    </>
  );
}
