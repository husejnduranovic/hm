import { cn, hashString, initials } from "@/lib/utils";

const AVATAR_COLORS = ["#135741", "#a65b3b", "#3e6b8c", "#7d4a66", "#4d6741", "#97761f"];

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const color = AVATAR_COLORS[hashString(name) % AVATAR_COLORS.length];
  const sizeCls = {
    sm: "size-8 text-[0.65rem]",
    md: "size-10 text-xs",
    lg: "size-14 text-base",
  }[size];

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-sans font-semibold tracking-wide text-paper",
        sizeCls,
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {initials(name)}
    </span>
  );
}
