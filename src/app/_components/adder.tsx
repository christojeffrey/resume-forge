"use client";
import { Button } from "@/src/components/ui/button";
import {
  currentItemEditedAtom,
  isEditingAtom,
  resumeDataAtom,
} from "@/src/store";
import { useAtom } from "jotai";

const initialTitle: TitleType = {
  type: "title",
  data: "testing",
  draft: false,
  id: "title",
};

const initialLinks: LinksType = {
  type: "links",
  data: [
    {
      text: "testing",
      href: "https://testing.com",
    },
  ],
  draft: false,
  id: "links",
};

const initialHeading: HeadingType = {
  type: "heading",
  data: "testing",
  draft: false,
  id: "heading",
};

const initialSection: SectionType = {
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
  id: "section",
};

const initialDivider: DividerType = {
  type: "divider",
  draft: false,
  id: "divider",
};

const initialDataForEachType: {
  title: TitleType;
  links: LinksType;
  heading: HeadingType;
  section: SectionType;
  divider: DividerType;
} = {
  title: initialTitle,
  links: initialLinks,
  heading: initialHeading,
  section: initialSection,
  divider: initialDivider,
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useState } from "react";
import {
  DividerType,
  HeadingType,
  ItemTypeOptions,
  itemTypes,
  LinksType,
  ResumeData,
  ResumeItem,
  SectionType,
  TitleType,
} from "@/src/lib/type";

function getID(item: ResumeItem, length: number) {
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
  const [, setResumeData] = useAtom(resumeDataAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleAdd = (type: ItemTypeOptions) => {
    setResumeData((prev: ResumeData) => {
      const newItem = getID(initialDataForEachType[type], prev.length);
      if (type !== "divider") {
        setCurrentItemEdited(newItem);
        setIsEditing(true);
      }
      if (location !== undefined) {
        return [...prev.slice(0, location), newItem, ...prev.slice(location)];
      } else {
        return [...prev, newItem];
      }
    });
  };

  return (
    <div className="flex flex-col">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          {itemTypes.map((itemType: ItemTypeOptions) => {
            return (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleAdd(itemType);
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
