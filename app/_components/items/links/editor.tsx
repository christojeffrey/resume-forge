"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentItemEditedAtom, resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

export default function LinksEditor() {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useAtom(currentItemEditedAtom);

  console.log("item from links", JSON.stringify(item, null, 2));

  return (
    <>
      <Label htmlFor="link">links</Label>
      <div className="flex flex-col gap-2">
        {item.data.map((link: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              id="link"
              placeholder="text"
              value={link.text}
              onChange={e => {
                setResumeData((prev: any) => {
                  const result = prev.map((tempItem: any) => {
                    if (tempItem.id === item.id) {
                      return {
                        ...tempItem,
                        data: tempItem.data.map((link: any, i: number) => {
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
                    return tempItem;
                  });
                  return result;
                });
              }}
            />
            <Input
              id="link"
              placeholder="link"
              value={link.href}
              onChange={e => {
                setResumeData((prev: any) => {
                  const result = prev.map((tempItem: any) => {
                    if (tempItem.id === item.id) {
                      return {
                        ...tempItem,
                        data: tempItem.data.map((link: any, i: number) => {
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
                    return tempItem;
                  });
                  return result;
                });
              }}
            />
            {/* delete button */}
            <Button
              onClick={() => {
                setResumeData((prev: any) => {
                  const result = prev.map((tempItem: any) => {
                    if (tempItem.id === item.id) {
                      return {
                        ...tempItem,
                        data: tempItem.data.filter(
                          (_: any, i: number) => i !== index
                        ),
                      };
                    }
                    return tempItem;
                  });
                  return result;
                });
              }}
            >
              delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
