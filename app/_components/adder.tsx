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

export default function Adder() {
  const [_, setResumeData] = useAtom(resumeDataAtom);
  const addTitle = () => {
    setResumeData((prev: any) =>
      generateID([
        ...prev,
        {
          type: "title",
          data: "testing",
          draft: false,
        },
      ])
    );
  };

  const addLinks = () => {
    setResumeData((prev: any) =>
      generateID([
        ...prev,
        {
          type: "links",
          data: [
            {
              text: "testing",
              href: "https://testing.com",
            },
          ],
          draft: false,
        },
      ])
    );
  };

  const addHeading = () => {
    setResumeData((prev: any) =>
      generateID([
        ...prev,
        {
          type: "heading",
          data: "testing",
          draft: false,
        },
      ])
    );
  };

  const addSection = () => {
    setResumeData((prev: any) =>
      generateID([
        ...prev,
        {
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
      ])
    );
  };

  const addDivider = () => {
    setResumeData((prev: any) =>
      generateID([
        ...prev,
        {
          type: "divider",
          draft: false,
        },
      ])
    );
  };

  return (
    <div className="flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What component to add?</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 w-1/2 mx-auto">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addTitle();
                  }}
                >
                  add title
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addLinks();
                  }}
                >
                  add links
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addHeading();
                  }}
                >
                  add heading
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addSection();
                  }}
                >
                  add section
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addDivider();
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
