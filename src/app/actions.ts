"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
// import { openai } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");
export async function continueConversation(
  messages: CoreMessage[],
  resume: string,
  isOnlyPartialResume: boolean
) {
  // add information about the resume to the system last message.
  // const newMessage = messages[messages.length - 1];
  // newMessage.content = ` my request is: ${newMessage.content}`;
  // remove the last message and add the new message
  // const newMessages = messages.slice(0, messages.length - 1);
  // newMessages.push(newMessage);
  // console.log(newMessages);
  console.log("resume", resume);

  let additionalContext = "";
  if (isOnlyPartialResume) {
    additionalContext =
      "This is a partial resume. Please provide feedback on the content: ";
  } else {
    additionalContext =
      "This is a full resume. Please provide feedback on the content: ";
  }
  additionalContext += resume;
  console.log("additionalContext", additionalContext);
  const result = await streamText({
    model,
    messages: messages,
    system: `You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. Be constructive, point out the good thing before giving suggestion. Help the candidate improve their resume. Focus on the content. Be aware of ATS and action verbs. Be concise. Be helpful. try your best to help the candidate improve their resume. This is my resume for context. Ignore if links. ${additionalContext}`,
  });

  const stream = createStreamableValue(result.textStream);
  return { message: stream.value };
}
