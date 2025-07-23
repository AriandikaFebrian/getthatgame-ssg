"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReportPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);

  // Cek localStorage apakah sudah paham
  useEffect(() => {
    const understood = localStorage.getItem("reportGuidelineUnderstood");
    if (!understood) {
      setShowModal(true);
    }
  }, []);

  const handleContinue = () => {
    if (!understandChecked) {
      toast.error("Please check the box to continue.");
      return;
    }
    localStorage.setItem("reportGuidelineUnderstood", "true");
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        // Coba ambil pesan error dari backend (jika backend sudah kirim JSON)
        const data = await res.json().catch(() => null);
        toast.error(data?.message || "Failed to submit report.");
        return;
      }

      toast.success("Report submitted successfully.");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to submit report. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-12 px-4 sm:px-6 md:px-8">
      {/* Modal Dialog */}
      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 dark:bg-black/40">



          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg p-6 max-w-lg w-full shadow-lg">

            <h2 className="text-xl font-semibold mb-4">Before You Submit a Report</h2>
            <p className="mb-4">
              Please read and understand the guidelines below before submitting a report:
            </p>
            <ul className="list-disc list-inside mb-4 text-sm">
              <li>Please provide a clear and detailed description of the issue.</li>
              <li>Avoid submitting spam or irrelevant messages.</li>
              <li>Do not include more than 2 links in your message.</li>
              <li>Your email is optional but recommended for follow-up.</li>
            </ul>
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={understandChecked}
                onChange={(e) => setUnderstandChecked(e.target.checked)}
              />
              <span>I understand and agree to follow the guidelines.</span>
            </label>
            <div className="text-right">
              <Button onClick={handleContinue}>Continue</Button>
            </div>
          </div>
        </div>
      )}

      {/* Form hanya tampil kalau modal sudah ditutup */}
      {!showModal && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Report an Issue</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Found a broken link or something not working properly? Let us know!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Your Email <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium">
                Describe the issue
              </label>
              <Textarea
                id="message"
                placeholder={`e.g. The download link for “Call of Duty” leads to a 404 error page. I tried multiple browsers but the issue persists.`}
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Please provide as much detail as possible — such as game title, page link,
                error message, or how to reproduce the issue.
              </p>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Sending..." : "Submit Report"}
            </Button>
          </form>
        </>
      )}
    </main>
  );
}
