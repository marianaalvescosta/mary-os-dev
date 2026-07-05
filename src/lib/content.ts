import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

// ---- Frontmatter shapes ----------------------------------------------------

export interface WorkEntry {
  [key: string]: unknown;
  title: string;
  role: string;
  yearTop: string;
  yearBot: string;
  order: number;
  footerNote?: string;
}

export interface Project {
  [key: string]: unknown;
  name: string;
  line1: string;
  line2: string;
  tags: string[];
  order: number;
  comingSoon?: boolean;
  deck?: string;
  button_link?: string;
  button_label?: string;
}

export interface Post {
  [key: string]: unknown;
  title: string;
  date: string;
  month: string;
  year: string;
  tag: string;
  placeholder?: boolean;
}

export interface Automation {
  [key: string]: unknown;
  name: string;
  description?: string;
  cover?: string;
  tags?: string[];
  product_link?: string;
  product_label?: string;
}

// ---- Readers ---------------------------------------------------------------

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
  const { data, content } = getEntry<T>(folder, slug);
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return { data, html: processed.toString() };
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
