import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export function getSlugs(folder: string): string[] {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getEntry<T extends Record<string, unknown>>(
  folder: string,
  slug: string
): { data: T; content: string } {
  const filePath = path.join(contentDir, folder, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export async function getEntryWithHtml<T extends Record<string, unknown>>(
  folder: string,
  slug: string
): Promise<{ data: T; html: string }> {
  const filePath = path.join(contentDir, folder, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return { data: data as T, html: processed.toString() };
}

export function getAllEntries<T extends Record<string, unknown>>(
  folder: string
): (T & { slug: string })[] {
  const slugs = getSlugs(folder);
  return slugs.map((slug) => {
    const { data } = getEntry<T>(folder, slug);
    return { ...data, slug };
  });
}
