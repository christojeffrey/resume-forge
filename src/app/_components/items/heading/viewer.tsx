import { Label } from "@/src/components/ui/label";
import { HeadingType } from "@/src/lib/type";

export default function HeadingViewer({ item }: { item: HeadingType }) {
  console.log("item heading: ", item);
  return (
    <div>
      <Label className="text-xs font-semibold text-slate-400">heading</Label>
      <h1 className="text-xl font-bold truncate">{item?.data}</h1>
    </div>
  );
}
