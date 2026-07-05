export default function Tag({
  children,
  muted,
  dim,
}: {
  children: React.ReactNode;
  /** Gray border + gray text (automation detail pages) */
  muted?: boolean;
  /** White border, dimmed text (coming-soon cards) */
  dim?: boolean;
}) {
  return (
    <span
      className={
        muted
          ? "border border-line text-faint px-2 py-0.5 text-[11px]"
          : dim
            ? "border border-white text-dim px-2 py-0.5 text-[11px]"
            : "border border-white text-white px-2 py-0.5 text-[11px]"
      }
    >
      {children}
    </span>
  );
}
