"use client";
import Link from "next/link";

export default function TitleBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 24px",
        borderBottom: "1px solid #fff",
        background: "#000",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
      </div>
      <Link
        href="/"
        style={{ color: "#fff", fontSize: "14px", fontWeight: "bold", letterSpacing: "0.03em" }}
      >
        Mary OS
      </Link>
    </div>
  );
}
