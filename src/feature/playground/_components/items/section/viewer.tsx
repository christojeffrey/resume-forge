import { Label } from "@/src/components/ui/label";
import { SectionType } from "@/src/lib/type";

export default function SectionViewer({ item }: { item: SectionType }) {
  return (
    <>
      <Label className="text-xs font-semibold text-slate-400">Section</Label>
      <h3 className="text-xl font-semibold">{item?.data?.title}</h3>
      <h4 className="text-lg font-semibold">{item?.data?.subtitle}</h4>
      <p>{item?.data?.date}</p>
      <p>{item?.data?.moreInformation}</p>
      <ObjectValueRenderer value={item?.data?.details?.objectValue} />
    </>
  );
}

function ObjectValueRenderer({ value }: { value: any[] }) {
  return value?.map((item: any, index: number) =>
    item.attributes?.bold ? (
      <span className="font-bold" key={`bold-${index}`}>
        {item.insert}
      </span>
    ) : (
      item.insert
        .split("\n")
        .map((line: string, i: number, array: string[]) => {
          return (
            <span key={`reguler-${i}`}>
              <span className="text-md">{line}</span>
              {i !== array.length - 1 && <br />}
            </span>
          );
        })
    )
  );
}
