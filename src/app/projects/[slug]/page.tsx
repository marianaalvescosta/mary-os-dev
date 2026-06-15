import Link from "next/link";
import { getSlugs, getEntryWithHtml } from "@/lib/content";
import { notFound } from "next/navigation";

interface Project {
  [key: string]: unknown;
  name: string;
  line1: string;
  line2: string;
  tags: string[];
  deck?: string;
  button_link?: string;
  button_label?: string;
}

export async function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data, html } = await getEntryWithHtml<Project>("projects", slug);
    return (
      <div style={{ padding: "32px 40px 48px 24px" }}>
        {/* Back button */}
        <Link
          href="/projects"
          style={{ color: "#555", fontSize: "13px", display: "inline-block", marginBottom: "16px" }}
        >
          &lt; {data.name}
        </Link>

        {/* Divider */}
        <div style={{ height: "1px", background: "#fff", marginBottom: "20px" }} />

        {/* Tags + optional button */}
        {data.tags?.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ border: "1px solid #fff", padding: "2px 8px", fontSize: "11px" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {data.button_link && (
              <Link
                href={data.button_link}
                style={{ border: "1px solid #fff", padding: "6px 16px", fontSize: "12px", color: "#fff", textDecoration: "none", whiteSpace: "nowrap", fontFamily: "monospace" }}
              >
                {data.button_label ?? "Learn more"}
              </Link>
            )}
          </div>
        )}

        {/* Body */}
        <div
          style={{ color: "#fff", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Pitch deck (when the project has one) — otherwise a placeholder */}
        {data.deck ? (
          <iframe
            src={data.deck}
            title={`${data.name} pitch deck`}
            allowFullScreen
            style={{
              width: "100%",
              height: "100vh",
              border: "1px solid #333",
              borderRadius: "12px",
              marginTop: "40px",
              display: "block",
            }}
          />
        ) : (
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
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
