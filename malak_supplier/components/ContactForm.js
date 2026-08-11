"use client";

import { useState } from "react";

/*
  Contact form → EmailJS hook.
  The EmailJS SDK isn't bundled — wire up your own account:

    1. npm install @emailjs/browser
    2. Create a Service + Email Template at https://www.emailjs.com
    3. Fill in SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY below.

  Field names (name, company, email, phone, subject, message) already
  match what a typical EmailJS template expects — just make sure your
  template's variables use the same names.
*/
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function ContactForm({ copy }) {
  const [status, setStatus] = useState({ state: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ state: "", message: copy.sending });

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, { publicKey: PUBLIC_KEY });
      setStatus({ state: "success", message: copy.success });
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus({
        state: "error",
        message:
          SERVICE_ID === "YOUR_SERVICE_ID"
            ? `${copy.error} (EmailJS isn't configured yet — see components/ContactForm.js.)`
            : copy.error,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">{copy.name}</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="company">{copy.company}</label>
          <input type="text" id="company" name="company" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">{copy.email}</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="phone">{copy.phone}</label>
          <input type="tel" id="phone" name="phone" />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="subject">{copy.subject}</label>
        <input type="text" id="subject" name="subject" />
      </div>
      <div className="form-field">
        <label htmlFor="message">{copy.message}</label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit" className="btn btn--primary" disabled={sending}>
        {sending ? copy.sending : copy.submit}
      </button>
      {status.message && (
        <p className="form-status" data-state={status.state}>
          {status.message}
        </p>
      )}
    </form>
  );
}
