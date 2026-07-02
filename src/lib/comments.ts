import commentsData from "@/data/comments.json";

/**
 * Komentari — UI sloj s demo podacima.
 *
 * TODO(backend): Kada backend bude spreman, `getComments` postaje dohvat
 * s API-ja (GET /api/komentari/[slug]), a `submitComment` POST zahtjev.
 * Potpisi funkcija su već oblikovani za tu zamjenu — komponente se ne mijenjaju.
 */

export type CommentT = {
  id: string;
  author: string;
  date: string;
  text: string;
  isStaff?: boolean;
  pending?: boolean;
  replies?: CommentT[];
};

export type NewCommentInput = {
  name: string;
  email: string;
  text: string;
  replyToId?: string;
};

export function getComments(slug: string): CommentT[] {
  const all = commentsData as Record<string, CommentT[]>;
  return all[slug] ?? [];
}

export function countComments(slug: string): number {
  return getComments(slug).reduce(
    (sum, c) => sum + 1 + (c.replies?.length ?? 0),
    0,
  );
}

/** Demo slanje komentara — simulira mrežni poziv i vraća "zaprimljen" komentar. */
export async function submitComment(
  _slug: string,
  input: NewCommentInput,
): Promise<CommentT> {
  await new Promise((resolve) => setTimeout(resolve, 650));
  return {
    id: `novi-${Date.now()}`,
    author: input.name,
    date: new Date().toISOString().slice(0, 10),
    text: input.text,
    pending: true,
  };
}
