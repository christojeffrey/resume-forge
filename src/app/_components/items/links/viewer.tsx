import { Label } from "@/src/components/ui/label";
import { LinksType } from "@/src/lib/type";

export default function LinksViewer({ item }: { item: LinksType}) {
  return (
    <>
      <div>
        <Label className="text-xs font-semibold text-slate-400">links</Label>

        <ul>
          {item.data.map((link: any, index: number) => (
            <li key={index}>
              <a href={link.href} key={index}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
