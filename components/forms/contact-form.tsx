"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import {
  budgetOptions,
  contactOptions,
  contactSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "form-field mt-2 w-full border-b border-line bg-transparent py-2.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-lime focus:outline-none";
const selectClass =
  "mt-2 w-full appearance-none border-b border-line bg-transparent py-2.5 pr-7 text-[0.9375rem] text-ink focus:border-lime focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      website: "",
      description: "",
      company_website_confirm: "",
    },
  });

  const description = watch("description") ?? "";

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-line bg-surface p-8 md:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-lime"><CheckCircle2 className="size-6 text-[#140A04]" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-medium tracking-[-0.03em] text-ink">
          Message received.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you for the detail — it genuinely helps. We will review your enquiry and get back to
          you at the email address you provided.
        </p>
        <p className="mt-4 text-sm text-muted">
          If it is time-sensitive, message us on{" "}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-ink"
          >
            WhatsApp
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="link-underline font-medium text-ink">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-ink/20 px-5 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-night hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Full name" required error={errors.fullName?.message} htmlFor="fullName">
          <input
            id="fullName"
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
        </Field>

        <Field label="Email address" required error={errors.email?.message} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>

        <Field label="Phone number" required error={errors.phone?.message} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>

        <Field label="Business name" error={errors.businessName?.message} htmlFor="businessName">
          <input
            id="businessName"
            autoComplete="organization"
            className={inputClass}
            placeholder="Company or brand"
            {...register("businessName")}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Website or social profile"
            hint="Optional"
            error={errors.website?.message}
            htmlFor="website"
          >
            <input
              id="website"
              className={inputClass}
              placeholder="https://yourbrand.com or @yourbrand"
              {...register("website")}
            />
          </Field>
        </div>

        <Field label="Service required" required error={errors.service?.message} htmlFor="service">
          <div className="relative">
            <select
              id="service"
              className={selectClass}
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              {...register("service")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field label="Estimated budget" required error={errors.budget?.message} htmlFor="budget">
          <div className="relative">
            <select
              id="budget"
              className={selectClass}
              defaultValue=""
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "budget-error" : undefined}
              {...register("budget")}
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Project description"
            required
            error={errors.description?.message}
            htmlFor="description"
            hint={`${description.length}/3000`}
          >
            <textarea
              id="description"
              rows={5}
              className={cn(inputClass, "resize-y")}
              placeholder="What are you building, what is the goal, and what is the timeline? The more context, the better."
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "description-error" : undefined}
              {...register("description")}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <fieldset
            aria-invalid={Boolean(errors.preferredContact)}
            aria-describedby={errors.preferredContact ? "preferredContact-error" : undefined}
          >
            <legend className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Preferred contact method <span className="text-lime-dark">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {contactOptions.map((option) => (
                <label
                  key={option}
                  className="cursor-pointer rounded-full border border-line px-4 py-2 text-[0.75rem] text-ink/60 transition-colors has-[:checked]:border-lime has-[:checked]:bg-lime has-[:checked]:text-[#140A04]"
                >
                  <input
                    type="radio"
                    value={option}
                    className="sr-only"
                    {...register("preferredContact")}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.preferredContact && (
              <p id="preferredContact-error" role="alert" className="mt-2 text-xs text-red-300">
                {errors.preferredContact.message}
              </p>
            )}
          </fieldset>
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website_confirm">Leave this field empty</label>
        <input
          id="company_website_confirm"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website_confirm")}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Your enquiry was not sent.</p>
            <p className="mt-1 text-red-200/80">{serverError}</p>
            <p className="mt-1 text-red-200/80">
              You can also email{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>{" "}
              directly.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.6875rem] leading-relaxed text-muted">
          By submitting this form you agree to our{" "}
          <a href="/privacy-policy" className="link-underline text-ink/70">
            privacy policy
          </a>
          . We will only use your details to respond to this enquiry.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-8 font-display text-sm uppercase tracking-[0.06em] text-[#140A04] transition-colors duration-500 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <span className="text-base transition-transform duration-500 group-hover:translate-x-0.5">
                ↔
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted"
        >
          {label} {required && <span className="text-lime-dark">*</span>}
        </label>
        {hint && <span className="text-[0.625rem] text-muted/70">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

