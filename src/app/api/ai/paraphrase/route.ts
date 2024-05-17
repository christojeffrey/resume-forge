import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");
export async function POST(req: Request) {
  const { textToParaphrase } = await req.json();
  try {
    // test return 500
    // throw new Error("test error");
    const { object } = await generateObject({
      model,
      schema: z.array(z.string()),
      system:
        "You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a job. Be constructive, point out the good thing before giving suggestion",
      prompt: `Give 3 paraphrase suggestions. Be aware of ATS and try to use the right keywords. here are the text to paraphrase: ${textToParaphrase}`,
    });
    return Response.json(object);
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
