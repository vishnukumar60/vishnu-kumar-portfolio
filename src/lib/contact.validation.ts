import { z } from "zod";

const controlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name must be 100 characters or fewer")
    .refine((value) => !controlCharacters.test(value), "Please use a valid name"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email must be 254 characters or fewer")
    .refine((value) => !controlCharacters.test(value), "Please use a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more (at least 10 characters)")
    .max(5000, "Message must be 5,000 characters or fewer")
    .refine((value) => !controlCharacters.test(value), "Please remove unsupported characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;