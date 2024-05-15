"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
// import { openai } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-pro");
export async function continueConversation(
  messages: CoreMessage[],
  resume: string
) {
  // add information about the resume to the system last message.
  const newMessage = messages[messages.length - 1];
  newMessage.content = `\n\n .This is my resume for context. The resume is given in plain text. Ignore the links. The resume is as follows: ${resume}. please give result in plaintext without text styling and keep the answer short and straight forward. my request is: ${newMessage.content}`;
  // remove the last message and add the new message
  const newMessages = messages.slice(0, messages.length - 1);
  newMessages.push(newMessage);
  console.log(newMessages);
  const result = await streamText({
    model,
    messages: newMessages,
    system: `You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a job. Be constructive, point out the good thing before giving suggestion. Help the candidate improve their resume. Focus on the content. Be aware of ATS and action verbs. Be concise. Be helpful. Be constructive. Be cheerful! try your best. give answer in plaintext wihthout text styling`,
  });

  const data = { test: "hello" };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}
