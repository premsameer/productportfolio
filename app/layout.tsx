import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prem Sameer — Product, AI & Growth",
  description: "Product manager with 10+ years building AI products, growth systems, and B2B SaaS. Explore case studies, product thinking, and shipped experiences.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

