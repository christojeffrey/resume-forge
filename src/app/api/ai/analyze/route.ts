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
    const { object } = await generateObject({
      model,
      schema: z.object({
        overall: z
          .string()
          .describe("The overall score of the resume out of 100"),
        ATSKeywords: z
          .string()
          .describe("The score of the resume based on ATS Keywords out of 100"),
        actionKeywords: z
          .string()
          .describe(
            "The score of the resume based on Action Keywords out of 100"
          ),
      }),
      system:
        "You are an Excellent Human Resource Agent who's job is to review resumes and provide feedback. You are reviewing a resume of a candidate who is applying for a job. Be constructive, point out the good thing before giving suggestion",
      prompt: `Review the resume based on some criteria out of 100. The resume is as follows: ${resume}`,
    });

    // parse the object as number
    const newObject = {
      overall: parseFloat(object.overall),
      ATSKeywords: parseFloat(object.ATSKeywords),
      actionKeywords: parseFloat(object.actionKeywords),
    };

    return Response.json(newObject);
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
