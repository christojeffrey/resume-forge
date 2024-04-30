import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import editSVG from "@/public/edit.svg";
import Image from "next/image";

function SVGIcon({ source, className }: { source: any; className: string }) {
  return (
    <Image
      src={source}
      width={20}
      height={20}
      alt="icon"
      className={className}
    />
  );
}
export function CommonEditor({
  id,
  item,
  View,
  Editor,
}: {
  id: string;
  item: any;
  View: React.ReactNode;
  Editor: React.ReactNode;
}) {
  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);

  const toggleDraft = () => {
    setResumeData(prev => {
      const result = prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            draft: !item.draft,
          };
        }
        return item;
      });
      return result;
    });
  };

  const handleDelete = () => {
    setResumeData(prev => {
      return prev.filter((item: any) => item.id !== id);
    });
  };

  return (
    <div className={`"mb-2 w-full ${item.draft ? "text-slate-400" : ""}`}>
      <Dialog>
        {/* view */}
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex justify-between w-full group">
              {/* right click trigger */}
              {View}
              {/* trigger */}
              <DialogTrigger>
                <SVGIcon
                  source={editSVG}
                  className="hidden group-hover:block"
                />
              </DialogTrigger>
            </div>
          </ContextMenuTrigger>
          {/* right click content */}
          <ContextMenuContent>
            <DialogTrigger asChild>
              <ContextMenuItem>edit</ContextMenuItem>
            </DialogTrigger>
            <ContextMenuItem onClick={handleDelete}>delete</ContextMenuItem>
            <ContextMenuItem onClick={toggleDraft}>
              set as draft
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {/* edit */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Title</DialogTitle>
            <DialogDescription>
              {Editor}
              <div className="flex flex-col gap-2 mt-2">
                {/* common editor */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="draft"
                    checked={item.draft}
                    onCheckedChange={toggleDraft}
                  />
                  {/* butttons */}
                  <Label
                    htmlFor="draft"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    draft
                  </Label>
                  {/* delete */}
                  <Button onClick={handleDelete}>Delete</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
