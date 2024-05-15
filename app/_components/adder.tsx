"use client";
import { Button } from "@/components/ui/button";
import { resumeDataAtom } from "@/store";
import { useAtom } from "jotai";

const initialDataForEachType = {
  title: {
    type: "title",
    data: "testing",
    draft: false,
  },
  links: {
    type: "links",
    data: [
      {
        text: "testing",
        href: "https://testing.com",
      },
    ],
    draft: false,
  },
  heading: {
    type: "heading",
    data: "testing",
    draft: false,
  },
  section: {
    type: "section",
    data: {
      title: "testing",
      subtitle: "testing",
      date: "testing",
      moreInformation: "testing",
      details: {
        htmlValue: "",
        objectValue: [
          {
            insert: "\n",
          },
        ],
      },
    },
    draft: false,
  },
  divider: {
    type: "divider",
    draft: false,
  },
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

function getID(item: any, length: number) {
  return {
    ...item,
    id: "id-" + length,
  };
}
export default function Adder({
  children,
  location,
}: {
  children: React.ReactNode;
  location?: number; // added after index number <location>
}) {
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleAdd = (
    type: "title" | "links" | "heading" | "section" | "divider"
  ) => {
    setResumeData((prev: any) => {
      if (location !== undefined) {
        return [
          ...prev.slice(0, location),
          getID(initialDataForEachType[type], prev.length),
          ...prev.slice(location),
        ];
      } else {
        return [...prev, getID(initialDataForEachType[type], prev.length)];
      }
    });
  };

  return (
    <div className="flex flex-col">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          {["title", "links", "heading", "section", "divider"].map(itemType => {
            return (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleAdd(itemType as any);
                    setIsPopoverOpen(false);
                  }}
                >
                  add {itemType}
                </Button>
              </>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
