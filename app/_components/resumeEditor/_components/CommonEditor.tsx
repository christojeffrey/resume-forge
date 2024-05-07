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
import { PenLine } from "lucide-react";

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
    setResumeData((prev: any) => {
      const result = prev.map((item: any) => {
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
    setResumeData((prev: any) => {
      return prev.filter((item: any) => item.id !== id);
    });
  };

  return (
    <div className={`"flex mb-2 w-full ${item.draft ? "text-slate-400" : ""}`}>
      <Dialog>
        {/* view */}
        <ContextMenu>
          {/* right click trigger */}
          <ContextMenuTrigger>
            <div className="flex flex-row justify-between w-full group">
              {/* fill */}
              <div className="flex-1 overflow-auto w-full">{View}</div>
              {/* icons */}
              <DialogTrigger>
                <PenLine className="hidden group-hover:block size-5" />
                {/* <SVGIcon source={editSVG} /> */}
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
