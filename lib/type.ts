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
  type: z.literal("section"),
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
