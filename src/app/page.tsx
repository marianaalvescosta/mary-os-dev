import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getAllEntries } from "@/lib/content";

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
    <div style={{ border: "1px solid #fff", padding: "16px 20px" }}>
      <div style={{ color: "#777", fontSize: "11px", marginBottom: "14px", letterSpacing: "0.05em" }}>
        {label}
      </div>
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
    <div style={{ display: "flex", gap: "12px", marginBottom: "8px", alignItems: "baseline", flexWrap: "wrap" }}>
      <span style={{ color: "#777", minWidth: "110px", flexShrink: 0 }}>{label}</span>
      <span
        style={
          gradient
            ? {
                background: "linear-gradient(90deg, #ffffff 0%, #888888 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : { color: "#fff" }
        }
      >
        {children}
      </span>
    </div>
  );
}

export default function LandingPage() {
  const photoPath = path.join(process.cwd(), "public", "profile.jpg");
  const hasPhoto = fs.existsSync(photoPath);

  const latestPost = getAllEntries<{ date: string }>("writing").sort(
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
      <div
        className="w-full md:w-[42%] shrink-0"
        style={{
          border: "1px solid #fff",
          position: "relative",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        {hasPhoto ? (
          <Image
            src="/profile.jpg"
            alt="Mariana Costa"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              gap: "8px",
              minHeight: "500px",
            }}
          >
            <span style={{ fontSize: "24px" }}>[ photo ]</span>
            <span style={{ fontSize: "10px", color: "#2a2a2a" }}>add public/profile.jpg</span>
          </div>
        )}
      </div>

      {/* Right — terminal boxes */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minWidth: 0,
        }}
      >
        {/* Box 1 — MARIANA.EXE */}
        <Box label="--- MARIANA.EXE ---">
          {fields.map((f) => (
            <Field key={f.label} label={f.label} gradient={f.gradient}>
              {f.value}
            </Field>
          ))}
          <Field label="Status:">
            <span style={{ color: "#4ade80" }} className="cursor-blink">
              Building...
            </span>
          </Field>
        </Box>

        {/* Box 2 — /directories */}
        <Box label="--- /directories ---">
          {directories.map((dir) =>
            dir.href ? (
              <Link
                key={dir.path}
                href={dir.href}
                className="dir-row"
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "8px",
                  color: "#fff",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <span className="dir-arrow">&gt;</span> {dir.path}
                </span>
                <span style={{ color: "#777" }}>{dir.desc}</span>
              </Link>
            ) : (
              <div
                key={dir.path}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "8px",
                  color: "#777",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                }}
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
