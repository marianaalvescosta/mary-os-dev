import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TitleBar from "@/components/TitleBar";
import Nav from "@/components/Nav";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marianaacosta.com"),
  title: {
    default: "Mary OS — Mariana Costa",
    template: "%s — Mary OS",
  },
  description:
    "Mariana Costa — business ops and AI automation. n8n pipelines, AI agents, and the things I build on the side.",
  openGraph: {
    title: "Mary OS — Mariana Costa",
    description:
      "Business ops and AI automation. n8n pipelines, AI agents, and the things I build on the side.",
    images: ["/profile.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body
        style={{
          fontFamily: "var(--font-mono), monospace",
          background: "#000",
          color: "#fff",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TitleBar />
        <Nav />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
