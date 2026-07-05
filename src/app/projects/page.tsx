import Link from "next/link";
import { getAllEntries, type Project } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Tag from "@/components/Tag";

export const metadata = {
  title: "projects",
  description: "Personal projects: Loomi, MindBuddy, and the automation gallery.",
};

export default function ProjectsPage() {
  const projects = getAllEntries<Project>("projects").sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="px-6 py-8">
      <PageHeader label="ls projects" />

      {/* 2x2 grid, single column on phones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const isComingSoon = project.comingSoon;
          const card = (
            <div
              className={`border border-white p-5 h-full ${
                isComingSoon ? "opacity-35" : "hover-card cursor-pointer"
              }`}
            >
              <p className="font-bold text-[15px] text-white mb-2">{project.name}</p>
              <p className="text-dim text-xs mb-1">{project.line1}</p>
              {project.line2 && (
                <p className="text-dim text-xs mb-3">{project.line2}</p>
              )}
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <Tag key={tag} dim={isComingSoon}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          );

          return isComingSoon ? (
            <div key={project.slug}>{card}</div>
          ) : (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
