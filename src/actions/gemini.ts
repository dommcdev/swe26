"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function analyzeRecipe(formData: FormData) {
  const result = await generateObject({
    model: google("gemini-3-flash-preview"),
    schema: z.object({
      recipeName: z.string(),
      ingredients: z.array(z.string()),
    }),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Please parse this recipe." },
          {
            type: "image",
            image: await (formData.get("image") as File).arrayBuffer(),
          },
        ],
      },
    ],
  });

  return result.object;
}
