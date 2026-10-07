import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.validation";
import { deliverContactMessage } from "./contact.server";

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      await deliverContactMessage(data);
      return { ok: true as const };
    } catch (error) {
      console.error("Contact message delivery failed", {
        error: error instanceof Error ? error.message : "Unknown delivery error",
      });
      return {
        ok: false as const,
        message: "Your message could not be sent right now. Please email me directly instead.",
      };
    }
  });