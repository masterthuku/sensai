import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a sub-industry",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience must be at most 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(", ")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});

export const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().optional(),
  linkedIn: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Please enter a title"),
    organization: z.string().min(1, "Please enter an organization"),
    startDate: z.string().min(1, "Please enter a start date"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Please enter a description"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required if not currently working here",
      path: ["endDate"],
    }
  );

  export const resumeSchema = z.object({
    contactInfo: contactSchema,
    summary: z.string().min(1, "Please enter a professional summary"),
    skills: z.string().min(1, "Please enter at least one skill"),
    experience: z.array(entrySchema),
    education: z.array(entrySchema),
    projects: z.array(entrySchema),
  })
