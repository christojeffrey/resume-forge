import { Label } from "@/src/components/ui/label";
import { TitleType } from "@/src/lib/type";

export default function TitleViewer({ item }: { item: TitleType }) {
  return (
    <div className="overflow-auto">
      <Label className="text-xs font-semibold text-slate-400">title</Label>
      <h1 className="text-3xl font-bold">{item?.data}</h1>
    </div>
  );
}
