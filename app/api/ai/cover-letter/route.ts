import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-pro");
export async function POST(req: Request) {
  const { resume, job } = await req.json();

  try {
    const result = await generateText({
      model,

      system:
        "You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a job. Be constructive, point out the good thing before giving suggestion",
      prompt: `Generate a clear concise cover letter for a ${job} position. The resume is given in plain text, so focus on the content. Give result in markdown. The resume is as follows: ${resume}`,
    });
    console.log("text", result.text);
    return Response.json({ coverLetter: result.text });
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
