"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Cell = { n: number; src: string; weight: number; pos?: string };

/**
 * Layout for the README page.
 *
 * Desktop (window wider than MOBILE_MAX): the photos are a two-column MASONRY
 * strip on the right. Each photo's height follows its real shape (portraits
 * tall, landscapes short), and the two columns are staggered — like a Pinterest
 * board. Each column stretches to the FULL text height (photos crop only
 * slightly via object-fit: cover), so the strip always ends exactly where the
 * text ends, at any width.
 *
 * Mobile (window <= MOBILE_MAX): the columns drop below the text, shown at their
 * natural height (a 25% side strip is too thin on a phone).
 *
 * The responsive switch is done in JS (matchMedia) on purpose — it does NOT rely
 * on globals.css, so a CSS build hiccup can't break the layout.
 */
const MOBILE_MAX = 600;

// One masonry cell: a photo whose height follows `weight` (its real aspect),
// cropped to fill.
function Slot({ cell, crop = true }: { cell: Cell; crop?: boolean }) {
  const img: CSSProperties = crop
    ? { width: "100%", height: "100%", objectFit: "cover", objectPosition: cell.pos ?? "center", display: "block" }
    : { width: "100%", height: "auto", display: "block" };
  return (
    <div
      style={{
        flex: crop ? `${cell.weight} 1 0` : "0 0 auto",
        minHeight: 0,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cell.src} alt={`photo ${cell.n}`} style={img} />
    </div>
  );
}

export default function ReadmeLayout({
  columns,
  hero,
  children,
}: {
  columns: Cell[][];
  hero: Cell | null;
  children: ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ---- Mobile: columns below the text, natural height (no cropping) ----
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px" }}>{children}</div>
        <div style={{ borderTop: "1px solid #fff" }}>
          <div style={{ display: "flex", gap: "4px", padding: "4px", alignItems: "flex-start" }}>
            {columns.map((col, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {col.map((cell) => (
                  <Slot key={cell.n} cell={cell} crop={false} />
                ))}
              </div>
            ))}
          </div>
          {hero && (
            <div style={{ padding: "0 4px 4px" }}>
              <Slot cell={hero} crop={false} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- Desktop: masonry strip that always matches the text height exactly ----
  // No flex:1 on the row, so its height is the text's height (not the viewport),
  // and the stretched sidebar inherits exactly that.
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {/* Left — text */}
      <div style={{ flex: 1, padding: "32px 40px 48px 24px", minWidth: 0 }}>{children}</div>

      {/* Right — masonry strip, height-matched to the text */}
      <div
        style={{
          width: "25%",
          flexShrink: 0,
          borderLeft: "1px solid #fff",
          alignSelf: "stretch",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "4px",
          }}
        >
          {/* Two masonry columns fill the space above the hero */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "4px" }}>
            {columns.map((col, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {col.map((cell) => (
                  <Slot key={cell.n} cell={cell} />
                ))}
              </div>
            ))}
          </div>
          {/* Photo 10 — full-width, at the very bottom */}
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.src}
              alt={`photo ${hero.n}`}
              style={{ width: "100%", height: "auto", display: "block", flexShrink: 0 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
