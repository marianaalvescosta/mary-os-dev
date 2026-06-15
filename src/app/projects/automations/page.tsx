import Link from "next/link";
import { getAllEntries } from "@/lib/content";

interface Automation extends Record<string, unknown> {
  name: string;
  description?: string;
  cover?: string;
  tags?: string[];
}

export default function AutomationsGrid() {
  const automations = getAllEntries<Automation>("automations") as (Automation & { slug: string })[];
  const allTags = Array.from(new Set(automations.flatMap((a) => a.tags ?? [])));

  return (
    <div style={{ padding: "24px 24px 48px 24px" }}>

      {/* Breadcrumb with extending line */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <Link
          href="/projects"
          style={{ color: "#fff", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}
        >
          &lt; automations
        </Link>
        <div style={{ flex: 1, height: "1px", background: "#333" }} />
      </div>

      {/* Tag chips */}
      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {allTags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #333",
                padding: "3px 10px",
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

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {automations.map((automation) => (
          <Link
            key={automation.slug}
            href={`/projects/automations/${automation.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                border: "1px solid #222",
                background: "#0a0a0a",
                cursor: "pointer",
              }}
            >
              {automation.cover ? (
                <img
                  src={automation.cover}
                  alt={automation.name}
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    background: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#333",
                    fontSize: "12px",
                  }}
                >
                  [ screenshot ]
                </div>
              )}
              <div
                style={{
                  padding: "10px 12px",
                  borderTop: "1px solid #222",
                }}
              >
                <span
                  style={{
                    color: "#ccc",
                    fontSize: "12px",
                    fontFamily: "monospace",
                  }}
                >
                  {automation.name.toLowerCase()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
