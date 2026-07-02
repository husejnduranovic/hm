import type { ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn, slugifyHeading } from "@/lib/utils";
import { StarGlyph } from "@/components/pattern";

// Detekcija arapskog pisma bez unicode-escape literala
const ARABIC_RE = new RegExp(
  `[${String.fromCharCode(0x0600)}-${String.fromCharCode(0x06ff)}]`,
);

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as ReactElement<{ children?: ReactNode }>).props.children);
  }
  return "";
}

/**
 * Renderer Markdown sadržaja s kućnim stilom:
 * - ## naslovi dobijaju ID za sadržaj (TOC),
 * - pasusi na arapskom automatski se slažu zdesna i većim pismom,
 * - --- postaje ornamentalni razdjelnik.
 */
export function Prose({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <div className={cn("prose-article", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slugifyHeading(nodeText(children))}>{children}</h2>,
          p: ({ children }) =>
            ARABIC_RE.test(nodeText(children)) ? (
              <p className="arabic" dir="rtl" lang="ar">
                {children}
              </p>
            ) : (
              <p>{children}</p>
            ),
          hr: () => (
            <div className="ornament-divider" role="separator">
              <StarGlyph className="size-3" />
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
