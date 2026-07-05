import Link from "next/link";
import { getSlugs, getEntryWithHtml, type Automation } from "@/lib/content";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";

export async function generateStaticParams() {
  return getSlugs("automations").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("automations").includes(slug)) return {};
  const { data } = await getEntryWithHtml<Automation>("automations", slug);
  return { title: data.name, description: data.description };
}

export default async function AutomationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("automations").includes(slug)) notFound();
  const { data, html } = await getEntryWithHtml<Automation>("automations", slug);
  return (
    <div className="pl-6 pr-10 pt-8 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-7 flex-wrap">
        <Link
          href="/projects/automations"
          className="text-dim text-[13px] whitespace-nowrap"
        >
          &lt; automations/
        </Link>
        <span className="text-white text-[13px]">{data.name.toLowerCase()}</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {/* Stack + button row */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-9">
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((tag) => (
              <Tag key={tag} muted>
                {tag}
              </Tag>
            ))}
          </div>
        )}
        {data.product_link && (
          <Link
            href={data.product_link}
            className="border border-accent text-accent px-4 py-1.5 text-xs whitespace-nowrap"
          >
            {data.product_label ?? "See product"}
          </Link>
        )}
      </div>

      {/* Body */}
      <div
        className="automation-body text-white leading-[1.8]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
