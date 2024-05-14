import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");
export async function POST(req: Request) {
  const { resume } = await req.json();
  console.log(resume);

  try {
    // const resume = `Title: John Doe`;
    const { object } = await generateObject({
      model,
      schema: z.object({
        keywordAndATSOptimization: z.number(),
        ActionVerbs: z.number(),
        relevantIndustries: z.array(z.string()),
        suggestions: z.array(z.string()),
      }),
      system:
        "You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a job",
      prompt: `Review the resume of the candidate applying for a job position. The resume is as follows: ${resume}`,
    });
    console.log("object", object);
    return Response.json(object);
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
  }
  return Response.json({ resume });
}