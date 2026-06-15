import Link from "next/link";
import { getSlugs, getEntryWithHtml } from "@/lib/content";
import { notFound } from "next/navigation";

interface Automation extends Record<string, unknown> {
  name: string;
  description?: string;
  tags?: string[];
  product_link?: string;
  product_label?: string;
}

export async function generateStaticParams() {
  return getSlugs("automations").map((slug) => ({ slug }));
}

export default async function AutomationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data, html } = await getEntryWithHtml<Automation>("automations", slug);
    return (
      <div style={{ padding: "32px 40px 48px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <Link
            href="/projects/automations"
            style={{ color: "#555", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            &lt; automations/
          </Link>
          <span style={{ color: "#fff", fontSize: "13px", fontFamily: "monospace" }}>
            {data.name.toLowerCase()}
          </span>
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
        </div>

        {/* Stack + button row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
          {data.tags && data.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid #333",
                    padding: "2px 8px",
                    fontSize: "11px",
                    color: "#888",
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {data.product_link && (
            <Link
              href={data.product_link}
              style={{
                border: "1px solid #fff",
                padding: "6px 16px",
                fontSize: "12px",
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
              }}
            >
              {data.product_label ?? "See product"}
            </Link>
          )}
        </div>

        {/* Body */}
        <style>{`
          .automation-body img { margin: 24px 0; display: block; }
        `}</style>
        <div
          className="automation-body"
          style={{ color: "#fff", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  } catch {
    notFound();
  }
}
