"use client";

import { type CoreMessage } from "ai";
import { useState } from "react";
import { continueConversation } from "@/src/app/actions";
import { readStreamableValue } from "ai/rsc";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { resumeDataToPlainText } from "@/src/lib/utils";
import { useAtom } from "jotai";
import { messagesAtom, resumeDataAtom } from "@/store";
import Markdown from "react-markdown";
export default function Chat() {
  const [resumeData] = useAtom(resumeDataAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useState("");

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
      resumeDataToPlainText(resumeData)
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
