"use client";

import { type CoreMessage } from "ai";
import { useState } from "react";
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
export default function Chat() {
  const [resumeData] = useAtom(resumeDataAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentItemEdited, setCurrentItemEdited] = useAtom(
    currentItemEditedAtom
  );

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
    <div className="flex flex-col h-full">
      {/* show context */}
      <div>
        {/* if is editing, only make use currently edited block as context */}
        {isEditing ? (
          <div>
            <div>{currentlyEditedSummary}</div>
          </div>
        ) : (
          <div>
            <div>resume data</div>
            {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
          </div>
        )}
      </div>
      {/* reset conversation */}
      <Button
        onClick={() => {
          setMessages([]);
        }}
      >
        Reset conversation
      </Button>
      {/* chat */}
      <ScrollArea className="flex-1  overflow-auto">
        <div className="">
          {messages.map((m, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              <Markdown>{m.content as string}</Markdown>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* bottom part - input */}
      <form className="w-4/5 mx-auto" action={invokeChat}>
        <div>suggestion input:</div>
        <input
          className="bottom-0 w-full p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Suggest improvement for my resume!"
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
