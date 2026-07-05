import Link from "next/link";
import { getSlugs, getEntryWithHtml } from "@/lib/content";
import { notFound } from "next/navigation";

interface Post {
  [key: string]: unknown;
  title: string;
  month: string;
  year: string;
  tag: string;
}

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
    <div style={{ padding: "32px 24px" }}>
      {/* Back button */}
      <Link
        href="/writing"
        style={{ color: "#777", fontSize: "13px", display: "inline-block", marginBottom: "16px" }}
      >
        &lt; writing/
      </Link>

      {/* Divider */}
      <div style={{ height: "1px", background: "#fff", marginBottom: "28px" }} />

      {/* Title + date */}
      <h1 style={{ color: "#fff", fontSize: "20px", lineHeight: "1.4", margin: "0 0 8px 0" }}>
        {data.title}
      </h1>
      <p style={{ color: "#777", fontSize: "11px", textTransform: "uppercase", margin: "0 0 32px 0" }}>
        {data.month} {data.year} · {data.tag}
      </p>

      {/* Body */}
      <div
        className="prose"
        style={{
          color: "#fff",
          lineHeight: "1.8",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
