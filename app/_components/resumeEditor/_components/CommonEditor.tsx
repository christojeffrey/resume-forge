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
import { Eye, EyeOff } from "lucide-react";

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
    <Dialog>
      {/* view */}
      <ContextMenu>
        {/* right click trigger */}
        <ContextMenuTrigger className="w-full">
          <div className="flex flex-row justify-between w-full group">
            {/* fill */}
            <DialogTrigger asChild>
              <div
                className={`flex-1 overflow-auto group ${item.draft ? "opacity-20" : ""}`}
              >
                {View}
              </div>
            </DialogTrigger>
            {/* icons */}
            {item.draft ? (
              <EyeOff
                className="size-5 group-hover:opacity-100 opacity-50"
                onClick={() => {
                  toggleDraft();
                }}
              />
            ) : (
              <Eye
                className="size-5 group-hover:opacity-100 opacity-50"
                onClick={() => {
                  toggleDraft();
                }}
              />
            )}
          </div>
        </ContextMenuTrigger>
        {/* right click content */}
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>edit</ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem onClick={handleDelete}>delete</ContextMenuItem>
          <ContextMenuItem onClick={toggleDraft}>set as draft</ContextMenuItem>
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
              <div className="flex items-center space-x-2 justify-between">
                <div className="flex gap-2">
                  <Checkbox
                    id="draft"
                    checked={item.draft}
                    onCheckedChange={toggleDraft}
                  />
                  <Label
                    htmlFor="draft"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    draft
                  </Label>
                </div>
                {/* delete */}
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
