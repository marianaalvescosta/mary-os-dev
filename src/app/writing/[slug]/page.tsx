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

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data, html } = await getEntryWithHtml<Post>("writing", slug);
    return (
      <div style={{ padding: "32px 24px" }}>
        {/* Back button */}
        <Link
          href="/writing"
          style={{ color: "#555", fontSize: "13px", display: "inline-block", marginBottom: "16px" }}
        >
          &lt; {data.title}
        </Link>

        {/* Divider */}
        <div style={{ height: "1px", background: "#fff", marginBottom: "20px" }} />

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
  } catch {
    notFound();
  }
}
