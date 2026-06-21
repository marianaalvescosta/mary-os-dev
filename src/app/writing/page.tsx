import Link from "next/link";
import { getAllEntries } from "@/lib/content";

interface Post {
  [key: string]: unknown;
  slug: string;
  title: string;
  date: string;
  month: string;
  year: string;
  tag: string;
  placeholder?: boolean;
}

export default function WritingPage() {
  const posts = getAllEntries<Post>("writing").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div style={{ padding: "32px 24px", width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <span style={{ color: "#555", fontSize: "12px", whiteSpace: "nowrap" }}>ls writing</span>
        <div style={{ flex: 1, height: "1px", background: "#fff" }} />
      </div>

      {/* Row list */}
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.placeholder ? "#" : `/writing/${post.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px",
              alignItems: "baseline",
              gap: "16px",
              padding: "12px 0",
              borderBottom: "1px solid #1a1a1a",
              color: "#fff",
            }}
          >
            {/* Date */}
            <span style={{ color: "#555", fontSize: "11px" }}>
              <span style={{ display: "block" }}>{post.month}</span>
              <span style={{ display: "block" }}>{post.year}</span>
            </span>

            {/* Title */}
            <span
              style={{
                fontWeight: "bold",
                color: post.placeholder ? "#555" : "#fff",
              }}
            >
              {post.title}
            </span>

            {/* Tag */}
            <span
              style={{
                color: "#555",
                fontSize: "11px",
                textAlign: "right",
                textTransform: "uppercase",
              }}
            >
              {post.tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
