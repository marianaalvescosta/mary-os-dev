import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getAllEntries, type Post } from "@/lib/content";

const fields = [
  { label: "Name:", value: "Mariana Costa" },
  { label: "Age:", value: "23 → 24" },
  { label: "Location(s):", value: "Lisbon, pt → Boston, usa", gradient: true },
  { label: "Role:", value: "Ops x AI x Automations" },
  { label: "Languages:", value: "Tech-fluent, not tech-native" },
  { label: "Stack:", value: "n8n, AI" },
];

function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-white px-5 py-4">
      <div className="text-dim text-[11px] mb-3.5 tracking-[0.05em]">{label}</div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  gradient,
}: {
  label: string;
  children: React.ReactNode;
  gradient?: boolean;
}) {
  return (
    <div className="flex gap-3 mb-2 items-baseline flex-wrap">
      <span className="text-dim min-w-[110px] shrink-0">{label}</span>
      <span className={gradient ? "text-gradient" : "text-white"}>{children}</span>
    </div>
  );
}

export default function LandingPage() {
  const photoPath = path.join(process.cwd(), "public", "profile.jpg");
  const hasPhoto = fs.existsSync(photoPath);

  const latestPost = getAllEntries<Post>("writing").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const directories = [
    { path: "loomi/", desc: "startup", href: "/projects/loomi" },
    { path: "automations/", desc: "workflow gallery", href: "/projects/automations" },
    {
      path: "writing/latest",
      desc: "most recent",
      href: latestPost ? `/writing/${latestPost.slug}` : "/writing",
    },
    { path: "knowledge/", desc: "library · coming soon", href: null },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-5 p-5 md:px-6">
      {/* Left — photo with frame */}
      <div className="w-full md:w-[42%] shrink-0 border border-white relative min-h-[400px] overflow-hidden">
        {hasPhoto ? (
          <Image
            src="/profile.jpg"
            alt="Mariana Costa"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center gap-2 text-line">
            <span className="text-2xl">[ photo ]</span>
            <span className="text-[10px] text-[#2a2a2a]">add public/profile.jpg</span>
          </div>
        )}
      </div>

      {/* Right — terminal boxes */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Box 1 — MARIANA.EXE */}
        <Box label="--- MARIANA.EXE ---">
          {fields.map((f) => (
            <Field key={f.label} label={f.label} gradient={f.gradient}>
              {f.value}
            </Field>
          ))}
          <Field label="Status:">
            <span className="text-accent cursor-blink">Building...</span>
          </Field>
        </Box>

        {/* Box 2 — /directories */}
        <Box label="--- /directories ---">
          {directories.map((dir) =>
            dir.href ? (
              <Link
                key={dir.path}
                href={dir.href}
                className="dir-row flex gap-4 mb-2 text-white items-baseline flex-wrap"
              >
                <span>
                  <span className="dir-arrow">&gt;</span> {dir.path}
                </span>
                <span className="text-dim">{dir.desc}</span>
              </Link>
            ) : (
              <div
                key={dir.path}
                className="flex gap-4 mb-2 text-dim items-baseline flex-wrap"
              >
                <span>&gt; {dir.path}</span>
                <span>{dir.desc}</span>
              </div>
            )
          )}
        </Box>

        {/* Box 3 — CONTACT */}
        <Box label="--- CONTACT ---">
          <Field label="EMAIL:">
            <a href="mailto:hi@marianaacosta.com">hi@marianaacosta.com</a>
          </Field>
          <Field label="LINKEDIN:">
            <a
              href="https://www.linkedin.com/in/mariana-alves-costa-"
              target="_blank"
              rel="noopener noreferrer"
            >
              → /in/mariana-alves-costa-
            </a>
          </Field>
        </Box>
      </div>
    </div>
  );
}
