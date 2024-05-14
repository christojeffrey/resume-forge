import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

// z schema type for resume generator
const titleSchema = z.object({
  type: z.literal("heading"),
  data: z.string(),
});
const linksSchema = z.object({
  type: z.literal("links"),
  data: z.array(
    z.object({
      text: z.string(),
      href: z.string(),
    })
  ),
});
const headingSchema = z.object({
  type: z.literal("heading"),
  data: z.string(),
});

const itemSchema = z.object({
  type: z.literal("item"),
  data: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    moreInformation: z.string(),
    details: z.object({
      htmlValue: z.string(),
      objectValue: z.array(
        z.object({
          insert: z.string(),
        })
      ),
    }),
  }),
});

const dividerSchema = z.object({
  type: z.literal("divider"),
});

const resumeSchema = z.union([
  titleSchema,
  linksSchema,
  headingSchema,
  itemSchema,
  dividerSchema,
]);

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");
export async function GET(req: Request) {
  //   const { description } = await req.json();
  //   console.log(description);

  const description =
    "I am a software engineer with 5 years of experience in web development. I have worked with React, Node.js, and MongoDB. I am looking for a job as a full-stack developer. I am familiar with Agile methodologies and have experience working in a team. I am a quick learner and can adapt to new technologies easily. I am passionate about coding and always looking to improve my skills. I am a good problem solver and can work under pressure. I am a good communicator and can work well with others. I am looking for a company where I can grow and contribute to the team.";

  try {
    // const resume = `Title: John Doe`;
    const { object } = await generateObject({
      model,
      schema: z.array(resumeSchema),
      system:
        "You are an Excellent Human Resource Agent who's job is to help someone craft their best resume. They will give descriptions about them, and you will generate the best resume for them",
      prompt: `Create a resume for someone with awareness of ATS. here's the description: ${description}`,
    });
    console.log("object", object);
    return Response.json(object);
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
  }
  return Response.json({ description });
}
