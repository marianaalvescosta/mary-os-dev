import { getSlugs, getEntryWithHtml, type Post } from "@/lib/content";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";

export async function generateStaticParams() {
  return getSlugs("writing").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("writing").includes(slug)) return {};
  const { data } = await getEntryWithHtml<Post>("writing", slug);
  return { title: data.title };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs("writing").includes(slug)) notFound();
  const { data, html } = await getEntryWithHtml<Post>("writing", slug);
  return (
    <div className="px-6 py-8">
      <BackLink href="/writing" label="writing/" />

      {/* Title + date */}
      <h1 className="text-white text-xl leading-snug mt-2 mb-2">{data.title}</h1>
      <p className="text-dim text-[11px] uppercase mb-8">
        {data.month} {data.year} · {data.tag}
      </p>

      {/* Body */}
      <div
        className="prose text-white leading-[1.8]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
