import { getSlugs, getEntry } from "@/lib/content";

interface WorkEntry {
  [key: string]: unknown;
  slug: string;
  title: string;
  role: string;
  yearTop: string;
  yearBot: string;
  order: number;
  footerNote?: string;
}

export default function WorkPage() {
  const entries = getSlugs("work")
    .map((slug) => {
      const { data, content } = getEntry<WorkEntry>("work", slug);
      const summary = content
        .split("\n")
        .filter((line) => !line.trim().startsWith("→"))
        .join(" ")
        .trim();
      return { ...data, slug, summary };
    })
    .sort((a, b) => a.order - b.order);

  const footerNote = entries.find((e) => e.footerNote)?.footerNote;

  return (
    <div style={{ padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <span style={{ color: "#555", fontSize: "12px", whiteSpace: "nowrap" }}>
          ls work contributions
        </span>
        <div style={{ flex: 1, height: "1px", background: "#fff" }} />
        <a
          href="/cv.pdf"
          download
          style={{
            color: "#22c55e",
            fontSize: "12px",
            whiteSpace: "nowrap",
            border: "1px solid #22c55e",
            padding: "4px 10px",
          }}
        >
          Download CV
        </a>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {entries.map((entry) => (
          <div
            key={entry.slug}
            style={{ display: "block", border: "1px solid #fff", padding: "16px 20px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontWeight: "bold", color: "#fff", margin: "0 0 4px 0" }}>
                  {entry.title}
                </p>
                <p style={{ color: "#555", margin: 0, fontSize: "12px" }}>{entry.role}</p>
              </div>
              <div style={{ textAlign: "right", color: "#fff", fontSize: "12px", flexShrink: 0, marginLeft: "24px" }}>
                <p style={{ margin: 0 }}>{entry.yearTop}</p>
                <p style={{ margin: 0 }}>{entry.yearBot}</p>
              </div>
            </div>
            <p style={{ color: "#999", fontSize: "13px", lineHeight: "1.6", margin: "12px 0 0 0" }}>
              {entry.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      {footerNote && (
        <p style={{ color: "#555", fontSize: "11px", marginTop: "24px" }}>
          → {footerNote}
        </p>
      )}
    </div>
  );
}
