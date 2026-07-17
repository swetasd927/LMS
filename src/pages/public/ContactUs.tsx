import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { contactService } from "../../services/contact.services";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await contactService.submit(form);

    setStatusMessage(result.message);
    setStatus(result.success ? "success" : "error");

    if (result.success) {
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#1c1d1f] px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Have a question about a course, your account, or a payment? Send us
          a message and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3">
        {/* Contact info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Mail size={18} />
            </span>
            <div>
              <p className="font-semibold text-[#1c1d1f]">Email</p>
              <p className="text-sm text-gray-600">support@lms-platform.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Phone size={18} />
            </span>
            <div>
              <p className="font-semibold text-[#1c1d1f]">Phone</p>
              <p className="text-sm text-gray-600">+977 1-234-5678</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <MapPin size={18} />
            </span>
            <div>
              <p className="font-semibold text-[#1c1d1f]">Office</p>
              <p className="text-sm text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={handleChange("name")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5624d0]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5624d0]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              value={form.subject}
              onChange={handleChange("subject")}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5624d0]"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5624d0]"
              placeholder="Tell us how we can help..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center gap-2 rounded-full bg-[#5624d0] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4a1fb8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={16} />
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm font-medium text-green-700">
              <CheckCircle2 size={16} /> {statusMessage}
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">{statusMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;