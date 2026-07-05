import Link from "next/link";
import { getAllEntries, type Automation } from "@/lib/content";

export const metadata = {
  title: "automations",
  description: "Workflow gallery — real n8n automations and AI agents I've built.",
};

export default function AutomationsGrid() {
  const automations = getAllEntries<Automation>("automations");
  return (
    <div className="px-6 pt-6 pb-12">
      {/* Breadcrumb with extending line */}
      <div className="flex items-center gap-3 mb-7">
        <Link href="/projects" className="text-white text-[13px] whitespace-nowrap">
          &lt; automations
        </Link>
        <div className="flex-1 h-px bg-line" />
      </div>

      {/* Grid, single column on phones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((automation) => (
          <Link key={automation.slug} href={`/projects/automations/${automation.slug}`}>
            <div className="hover-card border border-[#222] bg-panel cursor-pointer">
              {automation.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={automation.cover}
                  alt={automation.name}
                  className="w-full h-[220px] object-cover block"
                />
              ) : (
                <div className="w-full h-[220px] bg-[#111] flex items-center justify-center text-line text-xs">
                  [ screenshot ]
                </div>
              )}
              <div className="px-3 py-2.5 border-t border-[#222]">
                <span className="text-[#ccc] text-xs">{automation.name.toLowerCase()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
