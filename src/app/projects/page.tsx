import Link from "next/link";
import { getAllEntries } from "@/lib/content";

interface Project {
  [key: string]: unknown;
  slug: string;
  name: string;
  line1: string;
  line2: string;
  tags: string[];
  order: number;
  comingSoon?: boolean;
}

export const metadata = {
  title: "projects",
  description: "Personal projects: Loomi, MindBuddy, and the automation gallery.",
};

export default function ProjectsPage() {
  const projects = getAllEntries<Project>("projects").sort(
    (a, b) => a.order - b.order
  );

  return (
    <div style={{ padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <span style={{ color: "#777", fontSize: "12px", whiteSpace: "nowrap" }}>ls projects</span>
        <div style={{ flex: 1, height: "1px", background: "#fff" }} />
      </div>

      {/* 2x2 grid, single column on phones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const isComingSoon = project.comingSoon;
          const card = (
            <div
              className={isComingSoon ? undefined : "hover-card"}
              style={{
                padding: "20px",
                border: "1px solid #fff",
                opacity: isComingSoon ? 0.35 : 1,
                cursor: isComingSoon ? "default" : "pointer",
                height: "100%",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: "#fff",
                  margin: "0 0 8px 0",
                }}
              >
                {project.name}
              </p>
              <p style={{ color: "#777", margin: "0 0 4px 0", fontSize: "12px" }}>
                {project.line1}
              </p>
              {project.line2 && (
                <p style={{ color: "#777", margin: "0 0 12px 0", fontSize: "12px" }}>
                  {project.line2}
                </p>
              )}
              {project.tags?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: "1px solid #fff",
                        padding: "2px 8px",
                        fontSize: "11px",
                        color: isComingSoon ? "#777" : "#fff",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );

          return isComingSoon ? (
            <div key={project.slug}>{card}</div>
          ) : (
            <Link key={project.slug} href={`/projects/${project.slug}`} style={{ display: "block" }}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
