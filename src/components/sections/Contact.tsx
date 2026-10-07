import { useId, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card3D } from "@/components/common/Card3D";
import { Parallax } from "@/components/common/Parallax";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/lib/contact.functions";
import { contactSchema, type ContactFormValues } from "@/lib/contact.validation";
import { toast } from "sonner";

type FormStatus = "idle" | "success" | "error";

export function Contact() {
  const uid = useId();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const sendMessage = sendContactMessage;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields and try again.");
      return;
    }

    setLoading(true);
    setErrors({});
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await sendMessage({ data: result.data });
      if (!response.ok) {
        setStatus("error");
        setStatusMessage(response.message);
        toast.error(response.message);
        return;
      }

      setStatus("success");
      setStatusMessage("Message sent. I'll get back within 24 hours.");
      toast.success("Message sent. I'll get back within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("Your message could not be sent right now. Please try again.");
      toast.error("Your message could not be sent right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      description="Open to internships, full-time fresher roles, and interesting collaborations."
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5 sm:gap-6 lg:gap-8">
        <Parallax distance={26}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className=""
        >
        <Card3D intensity={4}>
        <div className="p-6 sm:p-8">
          <h3 className="font-display font-semibold text-xl">Get in touch</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            The fastest way to reach me is email. I usually reply within a day.
          </p>
          <div className="mt-6 space-y-3 text-[0.9rem] sm:text-sm">
            <a
              href="mailto:vishnukumar60rsv@gmail.com"
              className="flex min-w-0 items-center gap-3 hover:text-foreground transition-colors break-all"
            >
              <span className="size-9 shrink-0 rounded-xl bg-secondary grid place-items-center">
                <Mail className="size-4" aria-hidden />
              </span>
              vishnukumar60rsv@gmail.com
            </a>
            <a
              href="tel:+919361564248"
              className="flex min-w-0 items-center gap-3 hover:text-foreground transition-colors break-all"
            >
              <span className="size-9 shrink-0 rounded-xl bg-secondary grid place-items-center">
                <Phone className="size-4" aria-hidden />
              </span>
              +91 93615 64248
            </a>
            <div className="flex items-center gap-3">
              <span className="size-9 shrink-0 rounded-xl bg-secondary grid place-items-center">
                <MapPin className="size-4" aria-hidden />
              </span>
              Trichy, Tamil Nadu, India
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            {[
              { Icon: Github, label: "GitHub", href: "https://github.com/vishnukumar60" },
              {
                Icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/vishnukumar2027",
              },
              { Icon: Mail, label: "Email", href: "mailto:vishnukumar60rsv@gmail.com" },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, rotate: -4 }}
                className="size-11 rounded-2xl glass grid place-items-center hover:bg-foreground hover:text-background transition-colors"
              >
                <Icon className="size-4" aria-hidden />
              </motion.a>
            ))}
          </div>
          </div>
        </Card3D>
        </motion.div>
        </Parallax>

        <Parallax distance={-18}>
        <motion.form
          onSubmit={submit}
          noValidate
          aria-label="Contact form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-6 sm:p-8 shadow-soft space-y-4 sm:space-y-5"
        >
          <Field label="Your name" id={`${uid}-name`} error={errors["name"] ?? ""}>
            <Input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              aria-invalid={!!errors["name"]}
              aria-describedby={errors["name"] ? `${uid}-name-error` : undefined}
              placeholder="Vishnu"
            />
          </Field>
          <Field label="Email" id={`${uid}-email`} error={errors["email"] ?? ""}>
            <Input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              aria-invalid={!!errors["email"]}
              aria-describedby={errors["email"] ? `${uid}-email-error` : undefined}
              placeholder="vishnu@company.com"
            />
          </Field>
          <Field label="Message" id={`${uid}-message`} error={errors["message"] ?? ""}>
            <Textarea
              id={`${uid}-message`}
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              aria-invalid={!!errors["message"]}
              aria-describedby={errors["message"] ? `${uid}-message-error` : undefined}
              placeholder="Tell me about the role, project or idea…"
            />
          </Field>
          <div
            aria-live="polite"
            className={
              status === "success"
                ? "text-sm text-primary"
                : status === "error"
                  ? "text-sm text-destructive"
                  : "min-h-5 text-sm text-muted-foreground"
            }
          >
            {statusMessage}
          </div>
          <Button type="submit" disabled={loading} size="lg">
            <Send className="size-4" aria-hidden /> {loading ? "Sending…" : "Send message"}
          </Button>
        </motion.form>
        </Parallax>
      </div>
    </Section>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
        <label htmlFor={id}>{label}</label>
        {error && (
          <span id={`${id}-error`} className="text-destructive" role="alert" aria-live="polite">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
