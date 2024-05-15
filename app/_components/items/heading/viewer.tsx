import { Label } from "@/components/ui/label";

export default function HeadingViewer({ item }: { item: any }) {
  console.log("item heading: ", item);
  return (
    <div>
      <Label className="text-xs font-semibold text-slate-400">heading</Label>
      <h1 className="text-xl font-bold truncate">{item?.data}</h1>
    </div>
  );
}
