"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import Chat from "./_components/Chat";
import GenerateCoverLetter from "./_components/GenerateCoverLetter";
import Analyze from "./_components/Analyze";
import { AIFeatureRightNowAtom } from "@/store";
import { useAtom } from "jotai";

export default function AIAnalysis() {
  const [AIFeatureRightNow, setAIFeatureRightNowAtom] = useAtom(
    AIFeatureRightNowAtom
  );
  return (
    <>
      {/* create from linkedin? recommendation that can be applied directly with a click of a button? */}

      <Tabs
        defaultValue={AIFeatureRightNow}
        value={AIFeatureRightNow}
        className="h-full flex flex-col"
        onValueChange={value => {
          setAIFeatureRightNowAtom(
            value as "chat" | "analyze" | "cover-letter"
          );
        }}
      >
        <TabsList className="w-fit">
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-1 overflow-auto">
          <Chat />
        </TabsContent>
        <TabsContent value="analyze" className=" flex-1 overflow-auto">
          <Analyze />
        </TabsContent>
        <TabsContent value="cover-letter">
          <GenerateCoverLetter />
        </TabsContent>
      </Tabs>
    </>
  );
}
