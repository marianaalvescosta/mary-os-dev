import Link from "next/link";
import { getAllEntries, type Post } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "writing",
  description: "Posts about AI workflows, second brains, and building in public.",
};

export default function WritingPage() {
  const posts = getAllEntries<Post>("writing").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="px-6 py-8 w-full">
      <PageHeader label="ls writing" />

      {/* Row list */}
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.placeholder ? "#" : `/writing/${post.slug}`}
            className="hover-row grid grid-cols-[80px_1fr_80px] items-baseline gap-4 py-3 border-b border-[#1a1a1a] text-white"
          >
            {/* Date */}
            <span className="text-dim text-[11px]">
              <span className="block">{post.month}</span>
              <span className="block">{post.year}</span>
            </span>

            {/* Title */}
            <span className={`font-bold ${post.placeholder ? "text-dim" : "text-white"}`}>
              {post.title}
            </span>

            {/* Tag */}
            <span className="text-dim text-[11px] text-right uppercase">{post.tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
