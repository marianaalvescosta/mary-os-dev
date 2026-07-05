import Link from "next/link";
import { getSlugs, getEntryWithHtml, type Project } from "@/lib/content";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Tag from "@/components/Tag";

export async function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("projects").includes(slug)) return {};
  const { data } = await getEntryWithHtml<Project>("projects", slug);
  return { title: data.name.replace(/\/$/, ""), description: data.line1 };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("projects").includes(slug)) notFound();
  const { data, html } = await getEntryWithHtml<Project>("projects", slug);
  return (
    <div className="pl-6 pr-10 pt-8 pb-12">
      <BackLink href="/projects" label={data.name} />

      {/* Tags + optional button */}
      {data.tags?.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {data.button_link && (
            <Link
              href={data.button_link}
              className="border border-accent text-accent px-4 py-1.5 text-xs whitespace-nowrap"
            >
              {data.button_label ?? "Learn more"}
            </Link>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className="text-white leading-[1.8]"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Pitch deck (when the project has one) */}
      {data.deck && (
        <iframe
          src={data.deck}
          title={`${data.name} pitch deck`}
          allowFullScreen
          className="w-full h-screen border border-line mt-10 block"
        />
      )}
    </div>
  );
}
