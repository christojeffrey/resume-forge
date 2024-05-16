import { resumeDataSchema } from "@/src/lib/type";
import { generateID } from "@/src/store";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: process.env.GEMINI_API_KEY,
});
const model = google("models/gemini-1.5-pro-latest");
export async function POST(req: Request) {
  const { description } = await req.json();

  try {
    const { object } = await generateObject({
      model,
      schema: resumeDataSchema,
      system:
        "You are an Excellent Human Resource Agent who's job is to help someone craft their best resume. You are given a description of someone's educations and experiences and you need to convert it into a structured resume.",
      prompt: `Craft a resume best on this description: ${description}`,
    });

    // handle null. if any part is null, turn to empty string
    for (const item of object) {
      if (item.type === "section") {
        if (item.data.title === null) {
          item.data.title = "";
        }
        if (item.data.subtitle === null) {
          item.data.subtitle = "";
        }
        if (item.data.date === null) {
          item.data.date = "";
        }
        if (item.data.moreInformation === null) {
          item.data.moreInformation = "";
        }
        if (item.data.details === null) {
          item.data.details = "";
        }
      }
    }

    const response = generateID(
      object.map((item: any) => {
        if (item.type === "section") {
          return {
            ...item,
            draft: false,
            data: {
              ...item.data,
              details: {
                htmlValue: `<p>${item.data.details}</p>`,
                objectValue: [
                  {
                    insert: item.data.details,
                  },
                ],
              },
            },
          };
        }
        return {
          ...item,
          draft: false,
        };
      })
    );
    return Response.json(response);
  } catch (e) {
    console.log("ERROR!");
    console.error(e);
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
