import Link from "next/link";

/** "< label" back link followed by a full-width divider. */
export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <>
      <Link href={href} className="text-dim text-[13px] inline-block mb-4">
        &lt; {label}
      </Link>
      <div className="h-px bg-white mb-5" />
    </>
  );
}
