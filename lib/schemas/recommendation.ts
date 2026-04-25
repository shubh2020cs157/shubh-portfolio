import { z } from "zod";

export const RELATIONSHIPS = [
  "Worked together on the same team",
  "They managed me",
  "I managed them",
  "Collaborated across teams",
  "They were my mentor / teacher",
  "I was their mentor / teacher",
  "They were a client",
  "Studied together",
  "Other",
] as const;

export type Relationship = (typeof RELATIONSHIPS)[number];

export const recommendationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),
  role: z
    .string()
    .trim()
    .min(2, "Role must be at least 2 characters")
    .max(80, "Role must be under 80 characters"),
  company: z
    .string()
    .trim()
    .max(80, "Company must be under 80 characters")
    .optional()
    .or(z.literal("")),
  relationship: z.enum(RELATIONSHIPS, {
    message: "Please select how you know Shubh",
  }),
  linkedin: z.preprocess(
    (v) => {
      if (typeof v !== "string" || v.trim() === "") return "";
      const t = v.trim();
      return t.startsWith("http://") || t.startsWith("https://") ? t : `https://${t}`;
    },
    z
      .string()
      .url("Please enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)")
      .max(200)
      .optional()
      .or(z.literal(""))
  ),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number")
    .min(1, "Please choose a rating")
    .max(5),
  message: z
    .string()
    .trim()
    .min(20, "Recommendation must be at least 20 characters")
    .max(600, "Recommendation must be under 600 characters"),
  website: z.string().max(0, "").optional(),
});

export type RecommendationFormData = z.infer<typeof recommendationSchema>;
