import fs from "fs";
import path from "path";
import sharp from "sharp";
import ReadmeLayout from "./ReadmeLayout";

const stack = [
  "n8n", "claude", "jotform", "webflow",
  "monday.com", "make", "zapier", "openai",
];

const statusItems = [
  { done: true,  label: "graduated business management" },
  { done: true,  label: "built a freelance business" },
  { done: true,  label: "built MindBuddy MVP" },
  { done: true,  label: "joined accelerator program: Apollo by Junitec" },
  { done: true,  label: "joined Future Innovators Program by Unicorn Factory Lisboa" },
  { done: true,  label: "demoed Competitors' Research AI Agent at Unicorn Factory Innovation Day" },
  { done: false, label: "finish Harvard CS50" },
  { done: false, label: "ship Loomi v1" },
  { done: false, label: "incorporate — turn freelance into a scalable business" },
  { done: false, label: "get the O-1 visa" },
  { done: false, label: "move to boston", gradient: true },
];

function SectionHeading({ prefix, label }: { prefix: string; label: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <span style={{ color: "#777" }}>{prefix}</span>
        <span style={{ color: "#fff", fontWeight: "bold" }}>{label}</span>
      </div>
      <div style={{ height: "1px", background: "#fff" }} />
    </div>
  );
}

// ---- Mosaic layout config -------------------------------------------------
// Explicit control over the photo strip. Edit these to rearrange:
//   LEFT_COL / RIGHT_COL — which photo numbers go in each column, top to bottom
//   HERO_N               — the photo shown full-width at the very bottom
//   WEIGHT_SCALE         — shrink/grow a photo's frame (1 = natural, 0.5 = half)
const LEFT_COL = [1, 5, 7, 9, 11];
const RIGHT_COL = [2, 3, 4, 6, 8, 12];
const HERO_N = 10;
const WEIGHT_SCALE: Record<number, number> = { 11: 0.5 };
// Which part of a cropped photo to show: "50% 50%" = center (default),
// "50% 100%" = bottom, "50% 0%" = top. Higher 2nd value = show lower.
const OBJECT_POSITION: Record<number, string> = { 11: "50% 75%" };

// Read every photo's real aspect ratio. `weight` = natural height per unit
// width, so each slot keeps the photo's real shape (portraits tall, landscapes
// short) before WEIGHT_SCALE is applied.
async function getData() {
  const gridDir = path.join(process.cwd(), "public", "grid");
  const exts = [".jpg", ".jpeg", ".png", ".webp"];

  const byN = new Map<number, { n: number; src: string; weight: number; pos?: string }>();
  if (fs.existsSync(gridDir)) {
    for (let i = 1; i <= 30; i++) {
      for (const ext of exts) {
        const file = `photo-${i}${ext}`;
        if (fs.existsSync(path.join(gridDir, file))) {
          const meta = await sharp(path.join(gridDir, file)).metadata();
          const baseWeight = (meta.height || 1) / (meta.width || 1);
          byN.set(i, {
            n: i,
            src: `/grid/${file}`,
            weight: baseWeight * (WEIGHT_SCALE[i] ?? 1),
            pos: OBJECT_POSITION[i],
          });
          break;
        }
      }
    }
  }

  const pick = (nums: number[]) => nums.map((n) => byN.get(n)).filter((c) => c != null);
  const columns = [pick(LEFT_COL), pick(RIGHT_COL)];
  const hero = byN.get(HERO_N) ?? null;
  return { columns, hero };
}

export const metadata = {
  title: "readme",
  description: "About Mariana Costa — freelance ops, AI automation, and what's next.",
};

export default async function ReadmePage() {
  const { columns, hero } = await getData();
  return (
    <ReadmeLayout columns={columns} hero={hero}>
      {/* # mariana-costa */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{ color: "#777", fontSize: "18px" }}># </span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}>mariana-costa</span>
        </div>

        {/* Blockquote */}
        <div
          style={{
            borderLeft: "3px solid #fff",
            background: "#0a0a0a",
            padding: "14px 20px",
            marginBottom: "36px",
            color: "#aaa",
            fontSize: "13px",
            lineHeight: "1.9",
          }}
        >
          <p style={{ margin: 0 }}>Business ops and AI automation. Building toward something that&apos;s mine.</p>
        </div>

        {/* ## about */}
        <section style={{ marginBottom: "32px" }}>
          <SectionHeading prefix="##" label=" about" />
          <div style={{ color: "#fff", margin: "16px 0 0 0", lineHeight: "1.8" }}>
            <p style={{ margin: "0 0 16px 0" }}>
              I&apos;m Mariana. I started freelancing at 19 — as a virtual assistant, building from the ground up,
              figuring out what I could actually do. Four years later the work looks completely different.
              Still pointed at the same thing: something of my own.
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              On paper: business ops and AI automation. In practice: building n8n pipelines and AI integrations
              for companies, vibecoding personal projects on weekends, going very deep on AI — not in a &quot;I read
              the newsletters&quot; way, in a &quot;I can&apos;t stop building things with it&quot; way. Running other
              people&apos;s systems is the job. Building my own is the point.
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              I travel a lot, because it genuinely changes how you see things. I believe in what other cultures
              can teach you. Some trips that really shifted my perspective: Indonesia, Colombia, Peru, and the
              US — every time I&apos;ve been there. Outside of work: I love techno music and spending time with
              the people that actually make a difference in my life.
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              One odd thing about me: if I care about something it gets everything — a client problem, a trip
              I&apos;ve been planning for months, a DJ set I&apos;ve been looking forward to for three weeks.
              People have a word for that. Intense. I used to take it as an insult. Now I think it&apos;s the
              perfect word to describe me.
            </p>
            <p style={{ margin: 0 }}>
              The direction: my own company, genuinely technical, eventually the US. Not waiting on one to
              start the other.
            </p>
          </div>
        </section>

        {/* ## stack */}
        <section style={{ marginBottom: "32px" }}>
          <SectionHeading prefix="##" label=" stack" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            {stack.map((s) => (
              <span
                key={s}
                style={{
                  border: "1px solid #fff",
                  padding: "3px 10px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ## status */}
        <section style={{ marginBottom: "32px" }}>
          <SectionHeading prefix="##" label=" status" />
          <div
            style={{
              border: "1px solid #333",
              padding: "14px 20px",
              background: "#060606",
              marginTop: "16px",
            }}
          >
            {statusItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: i < statusItems.length - 1 ? "8px" : 0,
                  alignItems: "baseline",
                }}
              >
                <span style={{ color: item.done ? "#4ade80" : "#777", flexShrink: 0, fontWeight: "bold" }}>
                  {item.done ? "[x]" : "[ ]"}
                </span>
                <span
                  style={
                    item.gradient
                      ? {
                          background: "linear-gradient(90deg, #fff 0%, #666 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : {
                          color: item.done ? "#4ade80" : "#fff",
                          textDecoration: "none",
                        }
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ## contact */}
        <section>
          <SectionHeading prefix="##" label=" contact" />
          <p style={{ color: "#777", margin: "16px 0 0 0" }}>
            EMAIL:{" "}
            <a href="mailto:hi@marianaacosta.com" style={{ color: "#fff" }}>
              hi@marianaacosta.com
            </a>
          </p>
        </section>
    </ReadmeLayout>
  );
}
