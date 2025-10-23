"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ReviewForm({ productId }: { productId: string }) {
  const { isAuthenticated } = useKindeAuth();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        let message = "Could not submit your review. Please try again.";
        try {
          const data = await res.json();
          if (typeof data?.error === "string") message = data.error;
        } catch (err) {
          console.warn("Failed to parse review error", err);
        }
        setError(message);
        return;
      }

      setComment("");
      setRating(5);
      router.refresh();
    } catch (e) {
      console.error(e);
      setError("Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/40">
        <p className="text-sm text-amber-900">Please sign in to write a review.</p>
        <div className="mt-2">
          <LoginLink className="inline-flex items-center rounded-md border border-amber-200 px-3 py-1.5 text-sm font-semibold text-amber-900 hover:bg-amber-50">
            Sign in
          </LoginLink>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-amber-200">
      <div className="flex items-center gap-3">
        <Rating value={rating} onChange={setRating} items={5} readOnly={false} style={{ maxWidth: 130 }} />
        <span className="text-sm text-amber-800/80">Your rating: {rating}/5</span>
      </div>

      <div className="mt-3">
        <textarea
          className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm text-amber-900 placeholder:text-amber-800/60 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          rows={3}
          placeholder="Share your thoughts about this product (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-rose-600 font-semibold">{error}</p> : null}

      <div className="mt-3">
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="inline-flex items-center rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 disabled:opacity-70"
        >
          {submitting ? "Submitting..." : "Submit review"}
        </button>
      </div>
    </div>
  );
}
