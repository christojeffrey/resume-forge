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
import { Input } from "@/components/ui/input";

export default function Links({ id }: any) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [linkItem, setLinkItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  return (
    <div className="mb-2 w-full">
      <Dialog>
        {/* view mode */}
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex justify-between w-full">
              {/* right click trigger */}
              <div>
                <Label className="text-xs font-semibold text-slate-400">
                  links
                </Label>

                <ul>
                  {linkItem.data.map((link: any, index: number) => (
                    <li key={index}>
                      <a href={link.href} key={index}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
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
        {/* edit mode*/}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Links</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                {/* links */}
                <Label htmlFor="link">links</Label>
                {linkItem.data.map((link: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      id="link"
                      placeholder="text"
                      value={link.text}
                      onChange={e => {
                        setResumeData(prev => {
                          const result = prev.map(item => {
                            if (item.id === id) {
                              return {
                                ...item,
                                data: item.data.map((link: any, i: number) => {
                                  if (i === index) {
                                    return {
                                      ...link,
                                      text: e.target.value,
                                    };
                                  }
                                  return link;
                                }),
                              };
                            }
                            return item;
                          });
                          setLinkItem(
                            result.find((item: any) => item.id === id)
                          );
                          return result;
                        });
                      }}
                    />
                    <Input
                      id="link"
                      placeholder="link"
                      value={link.href}
                      onChange={e => {
                        setResumeData(prev => {
                          const result = prev.map(item => {
                            if (item.id === id) {
                              return {
                                ...item,
                                data: item.data.map((link: any, i: number) => {
                                  if (i === index) {
                                    return {
                                      ...link,
                                      href: e.target.value,
                                    };
                                  }
                                  return link;
                                }),
                              };
                            }
                            return item;
                          });
                          setLinkItem(
                            result.find((item: any) => item.id === id)
                          );
                          return result;
                        });
                      }}
                    />
                    {/* delete button */}
                    <Button
                      onClick={() => {
                        setResumeData(prev => {
                          const result = prev.map(item => {
                            if (item.id === id) {
                              return {
                                ...item,
                                data: item.data.filter(
                                  (_: any, i: number) => i !== index
                                ),
                              };
                            }
                            return item;
                          });
                          setLinkItem(
                            result.find((item: any) => item.id === id)
                          );
                          return result;
                        });
                      }}
                    >
                      delete
                    </Button>
                  </div>
                ))}
                {/* add button */}
                <Button
                  onClick={() => {
                    setResumeData(prev => {
                      const result = prev.map(item => {
                        if (item.id === id) {
                          return {
                            ...item,
                            data: [
                              ...item.data,
                              {
                                text: "",
                                href: "",
                              },
                            ],
                          };
                        }
                        return item;
                      });
                      setLinkItem(result.find((item: any) => item.id === id));
                      return result;
                    });
                  }}
                >
                  add
                </Button>

                {/* draft checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="draft"
                    checked={linkItem.draft}
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
                        setLinkItem(result.find((item: any) => item.id === id));
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
