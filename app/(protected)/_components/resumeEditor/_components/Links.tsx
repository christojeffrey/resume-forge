import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { CommonEditor } from "./CommonEditor";

function View({ item }: any) {
  return (
    <>
      <div>
        <Label className="text-xs font-semibold text-slate-400">links</Label>

        <ul>
          {item?.data?.map((link: any, index: number) => (
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

function Editor({ id, item }: any) {
  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);

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
                  const result = prev.map((item: any) => {
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
                  const result = prev.map((item: any) => {
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
                  return result;
                });
              }}
            />
            {/* delete button */}
            <Button
              onClick={() => {
                setResumeData((prev: any) => {
                  const result = prev.map((item: any) => {
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
export default function Links({ id }: any) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [item, setItem] = useState(
    resumeData.find((item: any) => item.id === id)
  );

  console.log("link item", item);
  useEffect(() => {
    setItem(resumeData.find((item: any) => item.id === id));
  }, [resumeData]);

  return (
    <CommonEditor
      id={id}
      item={item}
      View={View({ item: item })}
      Editor={Editor({ item: item, id: id })}
    />
  );
}
