import Link from "next/link";

export default function TitleBar() {
  return (
    <div className="flex items-center gap-3 px-6 py-2.5 border-b border-white bg-black shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full shrink-0 bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full shrink-0 bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full shrink-0 bg-[#28c840]" />
      </div>
      <Link href="/" className="text-white text-sm font-bold tracking-[0.03em]">
        Mary OS
      </Link>
    </div>
  );
}
