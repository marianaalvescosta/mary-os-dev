import Link from "next/link";
import { getAllEntries } from "@/lib/content";

interface Automation extends Record<string, unknown> {
  name: string;
  description?: string;
  cover?: string;
  tags?: string[];
}

export default function AutomationsGrid() {
  const automations = (getAllEntries<Automation>("automations") as (Automation & { slug: string })[])
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ padding: "32px 40px 48px 24px" }}>
      <Link
        href="/projects"
        style={{ color: "#555", fontSize: "13px", display: "inline-block", marginBottom: "16px" }}
      >
        &lt; projects/
      </Link>

      <div style={{ height: "1px", background: "#fff", marginBottom: "32px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
          background: "#222",
        }}
      >
        {automations.map((automation) => (
          <Link
            key={automation.slug}
            href={`/projects/automations/${automation.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                background: "#050505",
                cursor: "pointer",
                height: "100%",
              }}
            >
              {automation.cover ? (
                <img
                  src={automation.cover}
                  alt={automation.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
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
              <div style={{ padding: "16px 16px 20px" }}>
                <div style={{ color: "#fff", fontSize: "14px", marginBottom: "6px" }}>
                  {automation.name}
                </div>
                {automation.description && (
                  <div style={{ color: "#555", fontSize: "12px", lineHeight: "1.5" }}>
                    {automation.description}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
