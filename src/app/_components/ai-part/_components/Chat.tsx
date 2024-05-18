"use client";

import { useEffect, useRef, useState } from "react";
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
import { ChevronsUpDown, Send, StopCircle } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { useChat } from "ai/react";
export default function Chat() {
  const [resumeData] = useAtom(resumeDataAtom);
  // const [messages, setMessages] = useAtom(messagesAtom);
  // const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    setInput,
    isLoading,
    stop,
  } = useChat();
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
  function handleInvokeChat(e: React.FormEvent<HTMLFormElement>) {
    if (isLoading) return;
    if (input === "") return;
    handleSubmit(e, {
      options: {
        body: {
          messages: messages,
          resume: resumeDataToPlainText(
            isEditing && currentItemEdited ? [currentItemEdited] : resumeData
          ),
          isOnlyPartialResume: isEditing && currentItemEdited ? true : false,
        },
      },
    });
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
            {messages.map((m: any, i: number) => (
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
          <form onSubmit={handleInvokeChat} className="">
            <Button
              type="submit"
              className="break-words text-left"
              variant="link"
              onClick={() => {
                // clear chat, and generate cover letter
                setMessages([]);
                // intentionally without await
                // invokeChat("Generate Cover Letter for Software Engineer Role");
                setInput("Generate Cover Letter");
              }}
            >
              Generate Cover Letter
            </Button>
          </form>
        </CollapsibleContent>
      </Collapsible>

      <div>
        <form className="w-full mx-auto flex gap-2" onSubmit={handleInvokeChat}>
          <Input
            className="bottom-0 w-full p-2 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Suggest improvement for my resume!"
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {isLoading ? (
            <Button
              variant="destructive"
              className="w-12"
              onClick={e => {
                e.preventDefault();
                stop();
              }}
            >
              <StopCircle />
            </Button>
          ) : (
            <Button type="submit" variant="ghost" className="w-12">
              <Send />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
