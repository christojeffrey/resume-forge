"use client";
import { useAtom } from "jotai";
import Preview from "../_components/resumePreview";
import { Button } from "@/components/ui/button";
import { ResumeEditor } from "../_components/resumeEditor/ResumeEditor";
import {
  editingComponentAtom,
  isEditingAtom,
  isSavingAtom,
  modeAtom,
  resumeDataAtom,
  userAtom,
} from "@/store";

import Adder from "../_components/adder";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AIAnalysis from "../_components/AIAnalysis";

// main page

export default function Home() {
  const [mode] = useAtom(modeAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [editingComponent, setEditingComponent] = useAtom(editingComponentAtom);

  return (
    <div className="h-full">
      {/* phone */}
      <Tabs defaultValue="edit" className="xl:hidden flex flex-col h-full p-2">
        <TabsList className="w-fit mx-auto">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="view">View</TabsTrigger>
        </TabsList>
        <TabsContent
          value="edit"
          className="flex flex-col h-full overflow-auto gap-2"
        >
          <Editor />
        </TabsContent>
        <TabsContent value="view">
          <Viewer />
        </TabsContent>
      </Tabs>
      {/* full */}
      <div className="hidden xl:block w-3/4 mx-auto h-full py-2 gap-2">
        <div className="flex h-full gap-2">
          {/* left */}
          <div
            className={`${isEditing ? "w-1/3" : "w-1/2"} flex flex-col h-full overflow-auto gap-2 transition-all duration-300 ease-out`}
          >
            <Editor />
          </div>

          {/* middle */}
          <div
            className={`${isEditing ? "w-1/3" : "w-0"} overflow-hidden transition-all duration-300  
              ease-out`}
          >
            <div
              onClick={() => {
                setEditingComponent(null);
                setIsEditing(false);
              }}
              className="flex justify-end cursor-pointer"
            >
              <X className="w-6 h-6 " />
            </div>
            {/* fade in and out */}
            <div
              className={`transition-opacity ease-in duration-300 ${isEditing ? "opacity-100" : "opacity-0"}`}
            >
              {editingComponent}
            </div>
          </div>

          {/* right */}
          <div
            className={`${isEditing ? "w-1/3" : "w-1/2"} w-1/2 flex flex-col h-full transition-all duration-300 ease-out`}
          >
            {mode === "edit" ? <AIAnalysis /> : <Viewer />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Editor() {
  return (
    <div className="flex flex-col justify-between h-full">
      <ScrollArea>
        <ResumeEditor />
      </ScrollArea>
      <Adder>
        <Button variant="outline">Add</Button>
      </Adder>
    </div>
  );
}

function Viewer() {
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);
  const [resumeData] = useAtom(resumeDataAtom);
  const [userData, _setUserData] = useAtom(userAtom);

  const [timeoutSaveItem, setTimeoutSaveItem] = useState<NodeJS.Timeout | null>(
    null
  );
  // save every 15 seconds
  useEffect(() => {
    // use timeout
    if (timeoutSaveItem) {
      clearTimeout(timeoutSaveItem);
    }
    const t = setTimeout(async () => {
      await handleSave();
    }, 15000);
    setTimeoutSaveItem(t);

    return () => {
      if (timeoutSaveItem) {
        clearTimeout(timeoutSaveItem);
      }
    };
  }, [resumeData]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    if (userData) {
      await fetch(`/api/resume/${userData?.email}`, {
        method: "POST",
        body: JSON.stringify(resumeData),
      });
    }
    toast("Saved!", { icon: "👍" });
    setIsSaving(false);
  };
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      {/* preview part */}
      <div className="flex-1 overflow-auto">
        <Preview />
      </div>
      {/* bottom part */}
      <div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          save
        </Button>
      </div>
    </div>
  );
}
