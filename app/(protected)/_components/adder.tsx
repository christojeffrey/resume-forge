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
    setResumeData(prev =>
      generateID([
        ...prev,
        {
          type: "title",
          data: "testing",
        },
      ])
    );
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>Add</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What component to add?</DialogTitle>
            <DialogDescription>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addTitle();
                  }}
                >
                  add title
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
