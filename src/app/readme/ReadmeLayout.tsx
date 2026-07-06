import type { CSSProperties, ReactNode } from "react";

type Cell = { n: number; src: string; weight: number; pos?: string };

/**
 * Layout for the README page.
 *
 * Desktop (md and up): the photos are a two-column MASONRY strip on the right.
 * Each photo's height follows its real shape (portraits tall, landscapes
 * short), and the two columns are staggered — like a Pinterest board. Each
 * column stretches to the FULL text height (photos crop only slightly via
 * object-fit: cover), so the strip always ends exactly where the text ends.
 *
 * Mobile (below md): the columns drop below the text, shown at their natural
 * height (a 25% side strip is too thin on a phone). The two columns can end
 * at different natural heights (different photo counts/aspects), so the row
 * stretches both columns to match the taller one, and each column's LAST
 * photo grows + crops to absorb whatever gap that leaves — every other photo
 * stays fully natural/uncropped.
 *
 * Both layouts are rendered and toggled with responsive classes, so the
 * server-rendered HTML is correct at any width — no client JS, no flash.
 */

// One masonry cell: a photo whose height follows `weight` (its real aspect),
// cropped to fill. The flex weight is data-driven, so it stays an inline style.
// `grow` (mobile only): stretches + crops to absorb leftover column space.
function Slot({ cell, crop = true, grow = false }: { cell: Cell; crop?: boolean; grow?: boolean }) {
  const useCrop = crop || grow;
  const img: CSSProperties = useCrop
    ? { width: "100%", height: "100%", objectFit: "cover", objectPosition: cell.pos ?? "center", display: "block" }
    : { width: "100%", height: "auto", display: "block" };
  const flex = grow ? "1 1 0%" : crop ? `${cell.weight} 1 0` : "0 0 auto";
  return (
    <div className="overflow-hidden min-h-0 min-w-0" style={{ flex }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cell.src} alt="" style={img} />
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
  return (
    <div className="flex flex-col md:flex-row md:items-start">
      {/* Text — full width on mobile, left column on desktop */}
      <div className="flex-1 min-w-0 px-5 py-6 md:pt-8 md:pr-10 md:pb-12 md:pl-6">
        {children}
      </div>

      {/* Desktop: masonry strip, height-matched to the text */}
      <div className="hidden md:block w-1/4 shrink-0 border-l border-white self-stretch relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col gap-1 p-1">
          {/* Two masonry columns fill the space above the hero */}
          <div className="flex-1 min-h-0 flex gap-1">
            {columns.map((col, ci) => (
              <div key={ci} className="flex-1 min-w-0 flex flex-col gap-1">
                {col.map((cell) => (
                  <Slot key={cell.n} cell={cell} />
                ))}
              </div>
            ))}
          </div>
          {/* Hero photo — full-width, at the very bottom */}
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.src} alt="" className="w-full h-auto block shrink-0" />
          )}
        </div>
      </div>

      {/* Mobile: columns below the text, natural height (no cropping) except
          the last photo in each column, which grows/crops to close the gap
          left by the shorter column */}
      <div className="md:hidden border-t border-white">
        <div className="flex gap-1 p-1">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-1">
              {col.map((cell, i) => (
                <Slot key={cell.n} cell={cell} crop={false} grow={i === col.length - 1} />
              ))}
            </div>
          ))}
        </div>
        {hero && (
          <div className="px-1 pb-1">
            <Slot cell={hero} crop={false} />
          </div>
        )}
      </div>
    </div>
  );
}
