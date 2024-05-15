import { Label } from "@/components/ui/label";

export default function TitleViewer({ item }: { item: any }) {
  return (
    <div className="overflow-auto">
      <Label className="text-xs font-semibold text-slate-400">title</Label>
      <h1 className="text-3xl font-bold">{item?.data}</h1>
    </div>
  );
}
