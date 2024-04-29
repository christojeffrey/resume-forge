import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
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

export default function Title({ data, id }: { data: any; id: string }) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [titleItem, setTitleItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  const handleTitleChange = (e: any) => {
    setResumeData(prev => {
      const result = prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            data: e.target.value,
          };
        }
        return item;
      });
      setTitleItem(result.find((item: any) => item.id === id));
      return result;
    });
  };
  return (
    <div className="mb-2 w-full">
      <Dialog>
        {/* view */}
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex justify-between w-full">
              {/* right click trigger */}
              <div>
                <Label className="text-xs font-semibold text-slate-400">
                  title
                </Label>
                <h1 className="text-3xl font-bold">{titleItem.data}</h1>
              </div>
              {/* trigger */}
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
            </div>
          </ContextMenuTrigger>
          {/* right click content */}
          <ContextMenuContent>
            <DialogTrigger asChild>
              <ContextMenuItem>edit</ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        {/* edit */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Title</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">title</Label>
                <Textarea
                  id="title"
                  value={titleItem.data}
                  onChange={handleTitleChange}
                  placeholder="Title"
                  className="text-2xl"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="draft"
                    checked={titleItem.draft}
                    onCheckedChange={_ => {
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
                        setTitleItem(
                          result.find((item: any) => item.id === id)
                        );
                        return result;
                      });
                    }}
                  />
                  <Label
                    htmlFor="draft"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    draft
                  </Label>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
