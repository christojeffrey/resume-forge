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
import { AIFeatureRightNowAtom } from "@/src/store";
import { useAtom } from "jotai";
import { Separator } from "@/src/components/ui/separator";

export default function AIAnalysis() {
  const [AIFeatureRightNow, setAIFeatureRightNowAtom] = useAtom(
    AIFeatureRightNowAtom
  );
  return (
    <div className="flex h-full flex-col">
      {/* create from linkedin? recommendation that can be applied directly with a click of a button? */}
      <Analyze />
      <Separator />
      <div className="flex-1 overflow-auto ">
        <Chat />
      </div>
    </div>
  );
}
