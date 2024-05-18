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
    additionalContext = "This is the partial resume for context: ";
  } else {
    additionalContext = "This is the full resume for context: ";
  }
  additionalContext += resume;
  console.log("additionalContext", additionalContext);
  const result = await streamText({
    model,
    messages: messages,
    system: `You are an expert at crafting resume. Be aware of ATS and action verbs. You're going to help someone crafting their best resume. ${additionalContext}`,
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
