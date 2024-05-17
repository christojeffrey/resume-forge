"use client";
import Chat from "./_components/Chat";
import Analyze from "./_components/Analyze";
import { Separator } from "@/src/components/ui/separator";

export default function AIAnalysis() {
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
