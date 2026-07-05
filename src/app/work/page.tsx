import Link from "next/link";
import { getSlugs, getEntry, type WorkEntry } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "work",
  description: "Client work: automations, AI systems, and ops built by Mariana Costa.",
};

// Body lines starting with "→ [label](href)" become links on the card.
const LINK_LINE = /^→\s*\[([^\]]+)\]\(([^)]+)\)/;

export default function WorkPage() {
  const entries = getSlugs("work")
    .map((slug) => {
      const { data, content } = getEntry<WorkEntry>("work", slug);
      const lines = content.split("\n");
      const summary = lines
        .filter((line) => !line.trim().startsWith("→"))
        .join(" ")
        .trim();
      const links = lines
        .map((line) => line.trim().match(LINK_LINE))
        .filter((m) => m != null)
        .map((m) => ({ label: m[1], href: m[2] }));
      return { ...data, slug, summary, links };
    })
    .sort((a, b) => a.order - b.order);

  const footerNote = entries.find((e) => e.footerNote)?.footerNote;

  return (
    <div className="px-6 py-8">
      <PageHeader
        label="ls work contributions"
        right={
          <a
            href="/cv.pdf"
            download
            className="text-accent text-xs whitespace-nowrap border border-accent px-2.5 py-1"
          >
            Download CV
          </a>
        }
      />

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <div key={entry.slug} className="border border-white px-5 py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white mb-1">{entry.title}</p>
                <p className="text-dim text-xs">{entry.role}</p>
              </div>
              <div className="text-right text-xs shrink-0 ml-6">
                <p className="text-white">{entry.yearTop}</p>
                <p className="text-dim">{entry.yearBot}</p>
              </div>
            </div>
            <p className="text-faint text-[13px] leading-relaxed mt-3">
              {entry.summary}
            </p>
            {entry.links.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-4">
                {entry.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-accent text-xs">
                    → {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      {footerNote && (
        <p className="text-dim text-[11px] mt-6">→ {footerNote}</p>
      )}
    </div>
  );
}
