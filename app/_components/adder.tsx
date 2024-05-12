import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateID, resumeDataAtom } from "@/store";
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
    type: "item",
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
export default function Adder({
  children,
  location,
}: {
  children: React.ReactNode;
  location?: number; // added after index number <location>
}) {
  const [_, setResumeData] = useAtom(resumeDataAtom);

  const handleAdd = (
    type: "title" | "links" | "heading" | "section" | "divider"
  ) => {
    setResumeData((prev: any) => {
      if (location !== undefined) {
        return generateID([
          ...prev.slice(0, location),
          initialDataForEachType[type],
          ...prev.slice(location),
        ]);
      } else {
        return generateID([...prev, initialDataForEachType[type]]);
      }
    });
  };

  return (
    <div className="flex flex-col">
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What component to add?</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 w-1/2 mx-auto">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAdd("title");
                  }}
                >
                  add title
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAdd("links");
                  }}
                >
                  add links
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAdd("heading");
                  }}
                >
                  add heading
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAdd("section");
                  }}
                >
                  add section
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAdd("divider");
                  }}
                >
                  add divider
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
