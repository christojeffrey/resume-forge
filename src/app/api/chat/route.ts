import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { StreamingTextResponse, streamText, StreamData } from "ai";
const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");


export async function POST(req: Request) {
  const { messages, isOnlyPartialResume, resume } = await req.json();
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

  const data = new StreamData();

  data.append({ test: "value" });

  const stream = result.toAIStream({
    onFinal(_) {
      data.close();
    },
  });

  return new StreamingTextResponse(stream, {}, data);
}
