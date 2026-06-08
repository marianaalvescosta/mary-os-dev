"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "[README.md]", href: "/readme" },
  { label: "[ls work/]", href: "/work" },
  { label: "[ls projects/]", href: "/projects" },
  { label: "[ls writing/]", href: "/writing" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        borderBottom: "1px solid #fff",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const active =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              display: "block",
              padding: "12px 0",
              textAlign: "center",
              color: active ? "#fff" : "#555",
              borderBottom: active ? "2px solid #fff" : "2px solid transparent",
              marginBottom: "-1px",
              fontSize: "13px",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
