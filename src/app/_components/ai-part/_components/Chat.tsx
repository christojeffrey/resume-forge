"use client";

import { type CoreMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { continueConversation } from "@/src/app/actions";
import { readStreamableValue } from "ai/rsc";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { resumeDataToPlainText } from "@/src/lib/utils";
import { useAtom } from "jotai";
import {
  currentItemEditedAtom,
  isEditingAtom,
  messagesAtom,
  resumeDataAtom,
} from "@/src/store";
import Markdown from "react-markdown";
import { Button } from "@/src/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "@/src/components/ui/input";

export default function Chat() {
  const [resumeData] = useAtom(resumeDataAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  let currentlyEditedSummary = "";
  if (isEditing) {
    if (currentItemEdited) {
      if (currentItemEdited.type === "section") {
        currentlyEditedSummary = `Currently editing section: ${currentItemEdited.data.title}`;
      }
      if (currentItemEdited.type === "title") {
        currentlyEditedSummary = `Currently editing item: ${currentItemEdited.data}`;
      }
      if (currentItemEdited.type === "heading") {
        currentlyEditedSummary = `Currently editing heading: ${currentItemEdited.data}`;
      }
      if (currentItemEdited.type === "links") {
        currentlyEditedSummary = `Currently editing links`;
      }
      if (currentItemEdited.type === "divider") {
        currentlyEditedSummary = `Currently editing divider`;
      }
    }
  }

  async function invokeChat() {
    const newMessages: CoreMessage[] = [
      ...messages,
      {
        content: `${input}`,
        role: "user",
      },
    ];

    setMessages(newMessages);
    setInput("");

    const result = await continueConversation(
      newMessages,
      resumeDataToPlainText(
        isEditing && currentItemEdited ? [currentItemEdited] : resumeData
      ),
      isEditing && currentItemEdited ? true : false
    );

    for await (const content of readStreamableValue(result.message)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
    }
  }
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex justify-between">
        {/* show context */}
        <div className="text-sm text-slate-500 font-bold">
          {/* if is editing, only make use currently edited block as context */}
          {isEditing ? (
            <div>
              <div>{currentlyEditedSummary}</div>
            </div>
          ) : (
            <div>
              <div>resume data</div>
            </div>
          )}
        </div>
        {/* reset conversation */}
        <Button
          onClick={() => {
            setMessages([]);
          }}
          variant="link"
          className="text-red-500"
        >
          Clear Chat
        </Button>
      </div>

      {/* chat */}
      {messages.length === 0 ? (
        <div className="flex-1 flex justify-center items-center font-bold text-slate-500">
          say hi!
        </div>
      ) : (
        <ScrollArea className="flex-1 overflow-auto">
          <div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 ${m.role === "user" ? "bg-slate-100 rounded-md" : ""} whitespace-pre-wrap`}
              >
                {/* {m.role === "user" ? "User: " : "AI: "} */}
                <Markdown>{m.content as string}</Markdown>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      )}

      <div>
        {/* bottom part - input */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 ">
              <p className="text-sm font-semibold">Suggestions</p>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Button
              className=""
              variant="link"
              onClick={async () => {
                // clear chat, and generate cover letter
                setMessages([]);
                setInput("Generate cover letter");
                await invokeChat();
              }}
            >
              Generate cover letter
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <form
          className="w-full mx-auto"
          action={async () => {
            await invokeChat();
          }}
        >
          <Input
            className="bottom-0 w-full p-2 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Suggest improvement for my resume!"
            onChange={e => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
