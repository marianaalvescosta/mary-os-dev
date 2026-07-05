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
    <nav className="grid grid-cols-2 md:grid-cols-4 border-b border-white shrink-0">
      {tabs.map((tab) => {
        const active =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`block py-3 text-center text-[13px] border-b-2 -mb-px ${
              active ? "text-white border-white" : "text-dim border-transparent"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
