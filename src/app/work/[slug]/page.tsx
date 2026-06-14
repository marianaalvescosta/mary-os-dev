import Link from "next/link";
import { getSlugs, getEntryWithHtml } from "@/lib/content";
import { notFound } from "next/navigation";

interface WorkEntry {
  [key: string]: unknown;
  title: string;
  role: string;
  yearTop: string;
  yearBot: string;
  tags: string[];
}

export async function generateStaticParams() {
  return getSlugs("work").map((slug) => ({ slug }));
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data, html } = await getEntryWithHtml<WorkEntry>("work", slug);
    return (
      <div style={{ padding: "32px 24px", maxWidth: "800px" }}>
        {/* Back button */}
        <Link
          href="/work"
          style={{ color: "#555", fontSize: "13px", display: "inline-block", marginBottom: "16px" }}
        >
          &lt; {data.title.toLowerCase()}
        </Link>

        {/* Divider */}
        <div style={{ height: "1px", background: "#fff", marginBottom: "20px" }} />

        {/* Tags */}
        {data.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
            {data.tags.map((tag) => (
              <span
                key={tag}
                style={{ border: "1px solid #fff", padding: "2px 8px", fontSize: "11px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        <div
          style={{ color: "#fff", lineHeight: "1.8", maxWidth: "65ch" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Image placeholder */}
        <div
          style={{
            border: "1px solid #333",
            height: "240px",
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
            fontSize: "12px",
          }}
        >
          [ screenshot / image ]
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
