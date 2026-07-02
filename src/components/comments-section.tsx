"use client";

import { useState } from "react";
import { CheckCircle2, CornerDownRight, Send } from "lucide-react";
import { cn, formatDateBs } from "@/lib/utils";
import { t, tf } from "@/lib/i18n";
import { submitComment, type CommentT } from "@/lib/comments";
import { Avatar } from "@/components/avatar";

const LABEL = "mb-1.5 block text-sm font-medium text-ink";
const INPUT =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint transition-colors focus:border-gold-500 focus:outline-none";

function CommentItem({
  comment,
  onReply,
}: {
  comment: CommentT;
  onReply?: () => void;
}) {
  return (
    <li>
      <article className="flex gap-4">
        <Avatar name={comment.author} size={onReply ? "md" : "sm"} />
        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-[0.95rem] font-semibold text-ink">{comment.author}</span>
            {comment.isStaff && (
              <span className="rounded-full border border-gold-300 bg-gold-100 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-gold-700">
                {t("comments.staff")}
              </span>
            )}
            {comment.pending && (
              <span className="rounded-full border border-line bg-paper-deep px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink-faint">
                {t("comments.pending")}
              </span>
            )}
            <time className="text-xs text-ink-faint">{formatDateBs(comment.date)}</time>
          </header>

          <p
            className={cn(
              "mt-2 text-[0.95rem] leading-relaxed text-ink-soft",
              comment.pending && "italic",
            )}
          >
            {comment.text}
          </p>

          {onReply && !comment.pending && (
            <button
              onClick={onReply}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700 transition-colors hover:text-forest-500"
            >
              <CornerDownRight className="size-3.5" aria-hidden />
              {t("comments.reply")}
            </button>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <ul className="mt-5 space-y-5 border-l-2 border-line pl-4 sm:pl-6">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  );
}

/**
 * Sekcija komentara — UI s demo podacima i optimističnim dodavanjem.
 * TODO(backend): `submitComment` u lib/comments.ts zamijeniti API pozivom;
 * ova komponenta se ne mijenja.
 */
export function CommentsSection({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: CommentT[];
}) {
  const [comments, setComments] = useState<CommentT[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSuccess(false);

    const created = await submitComment(slug, {
      name: name.trim(),
      email: email.trim(),
      text: text.trim(),
      replyToId: replyTo?.id,
    });

    setComments((prev) =>
      replyTo
        ? prev.map((c) =>
            c.id === replyTo.id ? { ...c, replies: [...(c.replies ?? []), created] } : c,
          )
        : [...prev, created],
    );

    setName("");
    setEmail("");
    setText("");
    setReplyTo(null);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <section id="komentari" aria-label={t("comments.title")} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
          {t("comments.title")}
        </h2>
        <span className="rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-semibold text-forest-800">
          {total}
        </span>
      </div>

      {comments.length === 0 ? (
        <p className="mt-6 text-ink-soft">{t("comments.empty")}</p>
      ) : (
        <ul className="mt-8 space-y-7">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              onReply={() => {
                setReplyTo({ id: c.id, author: c.author });
                document.getElementById("kom-tekst")?.focus();
              }}
            />
          ))}
        </ul>
      )}

      <div className="mt-12 rounded-2xl bg-paper-card p-6 shadow-card ring-1 ring-line md:p-8">
        <h3 className="font-display text-xl font-medium text-ink">{t("comments.formTitle")}</h3>
        <p className="mt-1.5 text-sm text-ink-faint">{t("comments.note")}</p>

        {replyTo && (
          <div className="anim-fade-in mt-5 flex items-center justify-between gap-3 rounded-xl bg-forest-100/70 px-4 py-2.5 text-sm text-forest-900">
            <span className="flex min-w-0 items-center gap-2">
              <CornerDownRight className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{tf("comments.replyingTo", { name: replyTo.author })}</span>
            </span>
            <button
              onClick={() => setReplyTo(null)}
              className="shrink-0 text-xs font-semibold uppercase tracking-wide transition-colors hover:text-forest-600"
            >
              {t("comments.cancel")}
            </button>
          </div>
        )}

        {success && (
          <p
            role="status"
            className="anim-fade-in mt-5 flex gap-2.5 rounded-xl border border-forest-200 bg-forest-100/60 px-4 py-3 text-sm text-forest-900"
          >
            <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-forest-600" aria-hidden />
            {t("comments.success")}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="kom-ime" className={LABEL}>
              {t("comments.name")}
            </label>
            <input
              id="kom-ime"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={INPUT}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="kom-email" className={LABEL}>
              {t("comments.email")}
            </label>
            <input
              id="kom-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
              autoComplete="email"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="kom-tekst" className={LABEL}>
              {t("comments.message")}
            </label>
            <textarea
              id="kom-tekst"
              required
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={cn(INPUT, "resize-y")}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-forest-800 px-7 text-sm font-semibold text-paper transition-colors hover:bg-forest-700 disabled:opacity-60"
            >
              {loading ? t("comments.submitting") : t("comments.submit")}
              <Send className="size-4" aria-hidden />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
