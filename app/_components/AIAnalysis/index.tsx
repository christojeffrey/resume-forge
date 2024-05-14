import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIAnalysis() {
  return (
    <>
      {/* create from linkedin? recommendation that can be applied directly with a click of a button? */}

      <Tabs defaultValue="analyze" className="border border-black h-full">
        <TabsList>
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <Chat />
        </TabsContent>
        <TabsContent value="analyze">
          <Analyze />
        </TabsContent>
        <TabsContent value="cover-letter">
          <GenerateCoverLetter />
        </TabsContent>
      </Tabs>
    </>
  );
}

import { useAtom } from "jotai";
import Chat from "./_components/Chat";
import GenerateCoverLetter from "./_components/GenerateCoverLetter";
import Analyze from "./_components/Analyze";
