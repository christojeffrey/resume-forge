import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "./_components/Chat";
import GenerateCoverLetter from "./_components/GenerateCoverLetter";
import Analyze from "./_components/Analyze";

export default function AIAnalysis() {
  return (
    <>
      {/* create from linkedin? recommendation that can be applied directly with a click of a button? */}

      <Tabs
        defaultValue="analyze"
        className="h-full flex flex-col"
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
          {/* <div className="flex flex-col h-full border border-black">
            <div className="flex-1 overflow-auto">
              <div className="h-screen">long part</div>
            </div>
            <div className="border border-black">bottom</div>
          </div> */}
        </TabsContent>
        <TabsContent value="cover-letter">
          <GenerateCoverLetter />
        </TabsContent>
      </Tabs>
    </>
  );
}
