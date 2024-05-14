import { StreamingTextResponse, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-pro");

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);

  const resume = `Title: John Doe`;
  const result = await streamText({
    model,
    messages,
    system:
      "You are a Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a software engineering position",
    prompt: `Review the resume of the candidate applying for a software engineering position. The resume is as follows: ${resume}`,
  });

  return new StreamingTextResponse(result.toAIStream());
}
